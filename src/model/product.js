const { prisma } = require("../config/db");

const getAll = async () => {
    const products = await prisma.product.findMany({
        where: {
            deleted: false,
        },
    });

    return products;
}

const getById = async (id) => {
    const product = await prisma.product.findUnique({
        where: {
            deleted: false,
            id,
        },
    });

    return product;
};

const create = async (data) => {
    const product = await prisma.product.create({
        data
    });

    return product;
}

const updateById = async (id, data) => {
    const product = await prisma.product.update({
        where: {
            id,
        },
        data,
    });

    return product;
}

const softDeleteById = async (id) => {
    return await prisma.product.delete({
        where: { id }
    });
};

const hardDeleteById = async (id) => {
    return await prisma.product.delete({
        where: { id },
        forceDelete: true,
    });
}

const buyProduct = async (id, data) => {

    const product = await getById(id);

    if (data.quantity > stock) {
        throw new Error("out of stock");
    }

    product = await prisma.product.update({
        where: {
            id,
        },
        stock: stock - data.quantity,
    });

    return product;
}

module.exports = {
    getAll,
    getById,
    create,
    updateById,
    softDeleteById,
    hardDeleteById,
    buyProduct,
};

