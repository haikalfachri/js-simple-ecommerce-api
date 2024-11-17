const { prisma } = require("../config/db");

const getAll = async () => {
    const transactions = await prisma.transaction.findMany({
        where: {
            deleted: false,
        },
        include: {
            products: true,
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
        include: {
            products: true,
        },
    });

    return transaction;
};

const create = async (data) => {
    const transaction = await prisma.transaction.create({
        data: {
            user_id: data.userId,
            total_price: data.totalPrice,
        },
        include: {
            products: true,
        },
    });

    return transaction;
}

const updateById = async (id, data) => {
    const transaction = await prisma.transaction.update({
        where: {
            id,
        },
        data,
        include: {
            products: true,
        },
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

const buyProduct = async (userId, products) => {
    const productIds = products.map((p) => p.product_id);
    const fetchedProducts = await prisma.product.findMany({
        where: { id: { in: productIds } },
    });

    if (fetchedProducts.length !== products.length) {
        throw new Error("one or more products not found");
    }

    const transactionsOnProducts = [];
    let totalPrice = 0;

    for (const product of products) {
        const { product_id, quantity } = product;

        if (!product_id || quantity <= 0) {
            throw new Error("each product must have a valid product_id and a positive quantity");
        }

        const fetchedProduct = fetchedProducts.find((p) => p.id === product_id);

        if (!fetchedProduct) {
            throw new Error(`product with ID ${product_id} not found`);
        }

        if (fetchedProduct.stock < quantity) {
            throw new Error(`product with ID ${product_id} is out of stock`);
        }

        await prisma.product.update({
            where: { id: product_id },
            data: { stock: { decrement: quantity } },
        });

        const subtotalPrice = fetchedProduct.price * quantity;
        totalPrice += subtotalPrice;

        transactionsOnProducts.push({
            product_id,
            quantity,
            subtotal_price: subtotalPrice,
        });
    }

    const transaction = await prisma.transaction.create({
        data: {
            user_id: userId,
            total_price: totalPrice,
            products: {
                create: transactionsOnProducts,
            },
        },
        include: {
            products: true, 
        },
    });

    return transaction;
};

const transactionHistory = async (id) => {
    const transaction = await prisma.transaction.findMany({
        where: {
            deleted: false,
            user_id: id,
        },
        include: {
            products: true,
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


