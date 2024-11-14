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
    return await prisma.transaction.delete({
        where: { id }
    });
};

const hardDeleteById = async (id) => {
    return await prisma.transaction.delete({
        where: { id },
        forceDelete: true,
    });
}

