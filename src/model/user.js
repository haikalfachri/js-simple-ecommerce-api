const { prisma } = require("../config/db");

const getAll = async () => {
    const users = await prisma.User.findMany({
        where: {
            deleted: false,
        },
    });

    return users;
};

const getById = async (id) => {
    const user = await prisma.User.findUnique({
        where: {
            deleted: false,
            id,
        },
    });

    return user;
};

const create = async (data) => {
    const user = await prisma.User.create({
        data: {
            email: data.email,
            password: data.password,
        },
    });

    return user;
}

const updateById = async (id, data) => {
    const user = await prisma.User.update({
        where: {
            id,
        },
        data,
    });

    return user;
}

const softDeleteById = async (id) => {
    return await prisma.user.delete({
        where: { id }
    });
};

const hardDeleteById = async (id) => {
    return await prisma.user.delete({
        where: { id },
        forceDelete: true,
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