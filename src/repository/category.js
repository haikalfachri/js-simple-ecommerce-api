const { prisma } = require("../config/db");

const getAll = async () => {
    const categories = await prisma.category.findMany({
        where: {
            deleted: false,
        },
    });

    return categories;
}

const getById = async (id) => {
    const category = await prisma.category.findUnique({
        where: {
            deleted: false,
            id,
        },
    });

    return category;
};

const create = async (data) => {
    const category = await prisma.category.create({
        data
    });

    return category;
}

const updateById = async (id, data) => {
    const category = await prisma.category.update({
        where: {
            id,
        },
        data: {
            name: data.name,
        },
    });

    return category;
}

const softDeleteById = async (id) => {
    return await prisma.category.update({
        where: {
            id,
            deleted: true,
            deletedAt: new Date(),
        }
    });
}

const hardDeleteById = async (id) => {
    return await prisma.category.delete({
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
}

