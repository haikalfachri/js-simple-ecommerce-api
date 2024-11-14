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

const updateAuthenticationInfo = async (id, data) => {
    const updateData = {};

    if (data.email) {
        updateData.email = data.email;
    }

    if (data.password) {
        updateData.password = data.password;
    }

    const user = await prisma.User.update({
        where: { id },
        data: updateData,
    });

    return user;
};

module.exports = {
    create,
    getByEmail,
    updateAuthenticationInfo,
};