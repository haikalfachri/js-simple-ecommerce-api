const {
    create,
    getAll,
    getById,
    updateById,
    softDeleteById,
    hardDeleteById,
    buyProduct,
    transactionHistory,
} = require("../model/transaction");

const getAllController = async (req, res) => {
    try {
        const transactions = await getAll();

        res.status(200).json({
            status: "successfully get all transactions",
            data: transactions,
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

        const transaction = await getById(id);

        res.status(200).json({
            status: "successfully retrieved transaction by id",
            data: transaction,
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
        const { user_id, total_price } = req.body;

        const data = {
            userId: user_id,
            totalPrice: total_price
        }

        const transaction = await create(data);

        res.status(201).json({
            status: "successfully create new transaction",
            data: transaction,
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
        const { transactionData } = req.body;

        const transaction = await updateById(id, transactionData);

        res.status(200).json({
            status: "successfully update transaction by id",
            data: transaction,
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
            await hardDeleteById(id);
            res.status(200).json({
                status: "successfully hard delete transaction by id",
            });
        } else {
            await softDeleteById(id);
            res.status(200).json({
                status: "successfully soft delete transaction by id",
            });
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
        const { user_id, products } = req.body;

        if (!user_id || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({
                status: "error",
                message: "user_id and products (array of objects with product_id and quantity) are required",
            });
        }

        const transaction = await buyProduct(user_id, products);

        res.status(201).json({
            status: "success",
            message: "products successfully purchased",
            data: transaction,
        });
    } catch (error) {
        const statusCode = error.message.includes("out of stock") || error.message.includes("required")
            ? 400
            : 500;

        res.status(statusCode).json({
            status: "error",
            message: error.message,
        });
    }
};

const transactionHistoryController = async (req, res) => {
    try {
        const { id } = req.params;

        const transactions = await transactionHistory(id);

        res.status(200).json({
            status: "successfully get all transactions",
            data: transactions,
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
    transactionHistoryController,
};

