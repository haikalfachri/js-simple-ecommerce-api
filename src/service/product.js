const {
    getAll,
    getById,
    create,
    updateById,
    softDeleteById,
    hardDeleteById,
} = require("../model/product");

const getAllService = async () => {
    const products = await getAll();

    return products;
}

const getByIdService = async (id) => {
    const product = await getById(id);

    if (!product) {
        throw new Error("product not found");
    }

    return product;
}

const createService = async (data) => {
    const product = await create(data);

    return product;
}

const updateByIdService = async (id, data) => {
    const product = await updateById(id, data);

    if (!product) {
        throw new Error("product not found");
    }

    return product;
}

const softDeleteByIdService = async (id) => {
    const product = await softDeleteById(id);

    if (!product) {
        throw new Error("product not found");
    }

    return product;
}

const hardDeleteByIdService = async (id) => {
    const product = await hardDeleteById(id);

    if (!product) {
        throw new Error("product not found");
    }

    return product;
}

const buyProductService = async (id, data) => {
    const product = await buyProduct(id, data);

    if (!product) {
        throw new Error("product not found");
    }

    return product;
}

module.exports = {
    getAllService,
    getByIdService,
    createService,
    updateByIdService,
    softDeleteByIdService,
    hardDeleteByIdService,
    buyProductService,
};
