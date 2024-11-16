const { prisma } = require("../config/db");

const getAll = async () => {
    const transactions = await prisma.transaction.findMany({
        where: {
            deleted: false,
        },
    });

    return transactions;
}

const getById = async (id) => {
    const transaction = await prisma.transaction.findUnique({
        where: {
            deleted: false,
            id,
        },
    });

    return transaction;
};

const create = async (data) => {
    const transaction = await prisma.transaction.create({
        data
    });

    return transaction;
}

const updateById = async (id, data) => {
    const transaction = await prisma.transaction.update({
        where: {
            id,
        },
        data,
    });

    return transaction;
}

const softDeleteById = async (id) => {
    return await prisma.transaction.update({
        where: {
            id,
            deleted: true,
            deletedAt: new Date(),
        }
    });
}

const hardDeleteById = async (id) => {
    return await prisma.transaction.delete({
        where: {
            id,
        },
    });
}

const buyProduct = async (data) => {
    let product = await prisma.product.findFirst({
        where: {
            id: data.productId,
        }
    });
    
    if (product.stock - data.quantity < 0) {
        throw new Error("out of stock");
    }

    product = await prisma.product.update({
        where: {
            id: data.productId,
        },
        data: {
            stock: {
                decrement: data.quantity, 
            },
        },
    });

    totalPrice = product.price * data.quantity;
    console.log(totalPrice);

    const transaction = await prisma.transaction.create({
        data: {
            user_id: data.userId,
            product_id: data.productId,
            quantity: data.quantity,
        },
    });

    return transaction;
}

const transactionHistory = async (id) => {
    const transaction = await prisma.transaction.findMany({
        where: {
            deleted: false,
            userId: id,
        },
    });

    return transaction;
}

module.exports = {
    getAll,
    getById,
    create,
    updateById,
    softDeleteById,
    hardDeleteById,
    buyProduct,
    transactionHistory,
};


