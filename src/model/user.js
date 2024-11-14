const { prisma } = require("../config/db");

const getAll = async () => {
    const users = await prisma.user.findMany({
        where: {
            deleted: false,
        },
    });

    return users;
};

const getById = async (id) => {
    const user = await prisma.user.findUnique({
        where: {
            deleted: false,
            id,
        },
    });

    return user;
};

const create = async (data) => {
    const user = await prisma.user.create({
        data: {
            email: data.email,
            password: data.password,
        },
    });

    return user;
}

const updateById = async (id, data) => {
    const user = await prisma.user.update({
        where: {
            id,
        },
        data,
    });

    return user;
}

const softDeleteById = async (id) => {
    return await prisma.user.update({
        where: {
            id,
            deleted: true,
            deletedAt: new Date(),

        }
    });
};

const hardDeleteById = async (id) => {
    return await prisma.user.delete({
        where: {
            id,
        }
    });
};

module.exports = {
    getAll,
    getById,
    create,
    updateById,
    softDeleteById,
    hardDeleteById,
};