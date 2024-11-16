const {
    createService,
    getAllService,
    getByIdService,
    updateByIdService,
    softDeleteByIdService,
    hardDeleteByIdService,
    buyProductService,
    transactionHistoryService,
} = require("../service/transaction");

const getAllController = async (req, res) => {
    try {
        const transactions = await getAllService();

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

        const transaction = await getByIdService(id);

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
        const { transactionData } = req.body;

        if (!transactionData.userId || !transactionData.productId || !transactionData.amount) {
            throw new Error("userId, productId, and amount are required");
        }

        const transaction = await createService(transactionData);

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

        const transaction = await updateByIdService(id, transactionData);

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
            await hardDeleteByIdService(id);
            res.status(200).json({
                status: "successfully hard delete transaction by id",
            });
        } else {
            await softDeleteByIdService(id);
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
            throw new Error("user_id and products (array of objects with product_id and quantity) are required");
        }

        const transactions = [];
        for (const product of products) {
            const { product_id, quantity } = product;

            if (!product_id || !quantity) {
                throw new Error("each product must have product_id and quantity");
            }

            const data = {
                userId: user_id,
                productId: product_id,
                quantity: quantity,
            };

            const transaction = await buyProductService(data);
            transactions.push(transaction);
        }

        res.status(201).json({
            status: "successfully bought products",
            data: transactions,
        });
    } catch (error) {
        if (error.message === "user_id and products (array of objects with product_id and quantity) are required") {
            res.status(400).json({
                status: "error",
                message: "user_id and products (array of objects with product_id and quantity) are required",
            });
        } else if (error.message === "out of stock") {
            res.status(400).json({
                status: "error",
                message: "the product is out of stock",
            });
        } else {
            res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }
};

const transactionHistoryController = async (req, res) => {
    try {
        const { id } = req.params;

        const transactions = await transactionHistoryService(id);

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

