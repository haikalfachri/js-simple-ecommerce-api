const {
    getAll,
    getById,
    create,
    updateById,
    softDeleteById,
    hardDeleteById,
    buyProduct,
    transactionHistory,
} = require("../model/transaction");

const getAllService = async () => {
    const transactions = await getAll();

    return transactions;
}

const getByIdService = async (id) => {
    const transaction = await getById(id);

    if (!transaction) {
        throw new Error("transaction not found");
    }

    return transaction;
}

const createService = async (data) => {
    const transaction = await create(data);

    return transaction;
}

const updateByIdService = async (id, data) => {
    const transaction = await updateById(id, data);

    return transaction;
}

const softDeleteByIdService = async (id) => {
    const transaction = await softDeleteById(id);

    if (!transaction) {
        throw new Error("transaction not found");
    }

    return transaction;
}

const hardDeleteByIdService = async (id) => {
    const transaction = await hardDeleteById(id);

    if (!transaction) {
        throw new Error("transaction not found");
    }

    return transaction;
}

const buyProductService = async (data) => {
    const transaction = await buyProduct(data);

    if (err) {
        throw new Error("transaction not found");
    }

    return transaction;
}

const transactionHistoryService = async (data) => {
    const transaction = await transactionHistory(data);

    return transaction;
}

module.exports = {
    getAllService,
    getByIdService,
    createService,
    updateByIdService,
    softDeleteByIdService,
    hardDeleteByIdService,
    buyProductService,
    transactionHistoryService,
};


