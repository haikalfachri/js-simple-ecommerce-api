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
        data: {
            name: data.name,
            price: data.price,
            description: data.description,
            image_url: data.imageUrl,
            category_id: data.categoryId,
            stock: data.stock,
        },
    });

    return product;
}

const softDeleteById = async (id) => {
    return await prisma.product.update({
        where: {
            id,
            deleted: true,
            deletedAt: new Date(),
        }
    });
}

const hardDeleteById = async (id) => {
    return await prisma.product.delete({
        where: {
            id,
        },
    });
}

module.exports = {
    getAll,
    getById,
    create,
    updateById,
    softDeleteById,
    hardDeleteById,
};

