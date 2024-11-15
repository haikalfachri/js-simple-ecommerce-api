const {
    getAllService,
    getByIdService,
    createService,
    updateByIdService,
    softDeleteByIdService,
    hardDeleteByIdService,
} = require("../service/category");

const getAllController = async (req, res) => {
    try {
        const categories = await getAllService();

        res.status(200).json({
            status: "successfully get all categories",
            data: categories,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
}

const getByIdController = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await getByIdService(id);

        res.status(200).json({
            status: "successfully retrieved category by id",
            data: category,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
}

const createController = async (req, res) => {
    try {
        const { categoryData } = req.body;

        if (!categoryData.name) {
            throw new Error("name is required");
        }

        const category = await createService(categoryData);

        res.status(201).json({
            status: "successfully create new category",
            data: category,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
}

const updateByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const { categoryData } = req.body;

        const category = await updateByIdService(id, categoryData);

        res.status(200).json({
            status: "successfully update category by id",
            data: category,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
}

const deleteByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const { forceDelete } = req.query; 

        if (forceDelete === 'true') {
            await categoryService.hardDeleteCategory(id); 
            res.status(200).send('category hard-deleted');
        } else {
            await categoryService.softDeleteCategory(id);
            res.status(200).send('category soft-deleted');
        }
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
}

module.exports = {
    getAllController,
    getByIdController,
    createController,
    updateByIdController,
    deleteByIdController,
}
