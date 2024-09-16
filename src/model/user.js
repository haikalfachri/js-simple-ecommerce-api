const prisma = require("../config/db");

const getAll = async () => {
    const users = await prisma.users.findMany();

    return users;
};

const getById = async (id) => {
    const user = await prisma.users.findUnique({
        where: {
            id,
        },
    });

    return user;
};

const create = async (data) => {
    const user = await prisma.users.create({
        data: {
            email: data.email,
            password: data.password,
        },
    });

    return user;
}

const updateById = async (id, data) => {
    const user = await prisma.users.update({
        where: {
            id,
        },
        data,
    });

    return user;
}

const deleteById = async (id) => {
    const user = await prisma.users.delete({
        where: {
            id,
        },
    });

    return user;
}

const getByEmail = async (email) => {
    const user = await prisma.users.findUnique({
        where: {
            email,
        },
    });

    return user;
}

module.exports = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
    getByEmail,
};