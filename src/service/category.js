const {
    getAll,
    getById,
    create,
    updateById,
    softDeleteById,
    hardDeleteById,
} = require("../model/category");

const getAllService = async () => {
    const categories = await getAll();

    return categories;
}

const getByIdService = async (id) => {
    const category = await getById(id);

    if (!category) {
        throw new Error("category not found");
    }

    return category;
}

const createService = async (data) => {
    const category = await create(data);

    return category;
}

const updateByIdService = async (id, data) => {
    const category = await updateById(id, data);

    if (!category) {
        throw new Error("category not found");
    }

    return category;
}

const softDeleteByIdService = async (id) => {
    const category = await softDeleteById(id);

    if (!category) {
        throw new Error("category not found");
    }

    return category;
}

const hardDeleteByIdService = async (id) => {
    const category = await hardDeleteById(id);

    if (!category) {
        throw new Error("category not found");
    }

    return category;
}

module.exports = {
    getAllService,
    getByIdService,
    createService,
    updateByIdService,
    softDeleteByIdService,
    hardDeleteByIdService,
}
