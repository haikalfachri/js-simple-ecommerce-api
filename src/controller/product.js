const {
    getAllService,
    getByIdService,
    createService,
    updateByIdService,
    softDeleteByIdService,
    hardDeleteByIdService,
    buyProductService,
} = require("../model/product");

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
        const { productData } = req.body;

        const product = await updateByIdService(id, productData);

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
            await productService.hardDeleteProduct(id); 
            res.status(200).send('product hard-deleted');
        } else {
            await productService.softDeleteProduct(id);
            res.status(200).send('product soft-deleted');
        }
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
}

const buyProductController = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        if (!quantity) {
            throw new Error("quantity is required");
        }

        const product = await buyProductService(id, quantity);

        res.status(200).json({
            status: "successfully buy product by id",
            data: product,
        });
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
    buyProductController,
};

