const {
    getAllService,
    getByIdService,
    createService,
    updateByIdService,
    softDeleteByIdService,
    hardDeleteByIdService,
} = require("../service/product");

const getAllController = async (req, res) => {
    try {
        const products = await getAllService();

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

        const product = await getByIdService(id);

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
        const { productData } = req.body;

        if (!productData.name || !productData.price) {
            throw new Error("name and price are required");
        }

        const product = await createService(productData);

        res.status(201).json({
            status: "successfully create new product",
            data: product,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
}

const updateByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, image_url, stock, price, category_id } = req.body;

        const data = {
            name: name,
            description: description,
            imageUrl: image_url,
            stock: stock,
            price: price,
            categoryId: category_id,
        };

        const product = await updateByIdService(id, data);

        res.status(200).json({
            status: "successfully update product by id",
            data: product,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
}

const deleteByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const { forceDelete } = req.query; 

        if (forceDelete === 'true') {
            await hardDeleteByIdService(id); 
            res.status(200).json({
                status: "successfully hard delete product by id",
            });
        } else {
            await softDeleteByIdService(id);
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

