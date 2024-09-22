const { prisma } = require("../config/db");

const create = async (data) => {
    const user = await prisma.User.create({
        data,
    });

    return user;
}

const getByEmail = async (email) => {
    const user = await prisma.User.findUnique({
        where: {
            email,
        },
    });

    return user;
}

module.exports = {
    create,
    getByEmail,
};