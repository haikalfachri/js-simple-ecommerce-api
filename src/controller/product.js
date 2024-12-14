const {
    getAll,
    getById,
    create,
    updateById,
    softDeleteById,
    hardDeleteById,
} = require("../repository/product");

const fs = require("fs");
const path = require("path");

const getAllController = async (req, res) => {
    try {
        const products = await getAll();

        res.status(200).json({
            status: "successfully get all products",
            data: products,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
}

const getByIdController = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await getById(id);

        res.status(200).json({
            status: "successfully retrieved product by id",
            data: product,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
}

const createController = async (req, res) => {
    try {
        const { name, description, stock, price, category_id } = req.body;
        const folder = "product";
        const image_url = req.file ? `asset/${folder}/${req.file.filename}` : null;

        const data = {
            name,
            description,
            imageUrl: image_url,
            stock: stock ? parseInt(stock, 10) : undefined,
            price: price ? parseFloat(price) : undefined,
            categoryId: category_id,
        };

        const product = await create(data);

        res.status(201).json({
            status: "success",
            message: "successfully created new product",
            data: product,
        });
    } catch (error) {
        if (req.file) {
            const folder = "product";
            const imagePath = path.join(__dirname, "../public", `asset/${folder}/${req.file.filename}`);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

const updateByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, stock, price, category_id } = req.body;
        const folder = "product";
        const image_url = req.file ? `asset/${folder}/${req.file.filename}` : null;

        const existingProduct = await getById(id);

        if (!existingProduct) {
            return res.status(404).json({
                status: "error",
                message: "product not found",
            });
        }

        if (image_url && existingProduct.image_url) {
            const oldImagePath = path.join(__dirname, "../public", existingProduct.image_url);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }

            const updatedData = {
                name: name || existingProduct.name,
                description: description || existingProduct.description,
                imageUrl: image_url || existingProduct.image_url,
                stock: stock ? parseInt(stock, 10) : existingProduct.stock,
                price: price ? parseFloat(price) : existingProduct.price,
                categoryId: category_id || existingProduct.category_id,
            };

            const updatedProduct = await updateById(id, updatedData);

            res.status(200).json({
                status: "success",
                message: "successfully updated the product",
                data: updatedProduct,
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

const deleteByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const { forceDelete } = req.query;

        if (forceDelete === 'true') {
            const existingProduct = await getById(id);
            const imagePath = path.join(__dirname, "../public", existingProduct.image_url);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }

            await hardDeleteById(id);
            res.status(200).json({
                status: "successfully hard delete product by id",
            });
        } else {
            await softDeleteById(id);
            res.status(200).json({
                status: "successfully soft delete product by id",
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
}

module.exports = {
    getAllController,
    getByIdController,
    createController,
    updateByIdController,
    deleteByIdController,
};

