const {
    getAll,
    getById,
    create,
    deleteById,
    updateById,
    getByEmail,
} = require("../model/user");

const getAllService = async () => {
    const users = await getAll();

    return users;
}

const getByIdService = async (id) => {
    const user = await getById(id);

    if (!user) {
        throw new Error("User not found");
    }

    return user;
}

const createService = async (data) => {
    const user = await create(data);

    return user;
}

const updateByIdService = async (id, data) => {
    const user = await updateById(id, data);

    if (!user) {
        throw new Error("User not found");
    }

    return user;
}

const deleteByIdService = async (id) => {
    const user = await deleteById(id);

    if (!user) {
        throw new Error("User not found");
    }

    return user;
}

const getByEmailService = async (email) => {
    const user = await getByEmail(email);

    if (!user) {
        throw new Error("User not found");
    }

    return user;
}

module.exports = {
    getAllService,
    getByIdService,
    createService,
    updateByIdService,
    deleteByIdService,
    getByEmailService,
};

