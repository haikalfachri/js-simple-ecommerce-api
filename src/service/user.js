const {
    getAll,
    getById,
    create,
    updateById,
    softDeleteById,
    hardDeleteById,
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

const softDeleteByIdService = async (id) => {
    const user = await softDeleteById(id);

    if (!user) {
        throw new Error("User not found");
    }

    return user;
}

const hardDeleteByIdService = async (id) => {
    const user = await hardDeleteById(id);

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
    softDeleteByIdService,
    hardDeleteByIdService,
};

