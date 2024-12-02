const {
    hashPassword,
} = require("../utils/bcrypt");

const {
    getAll,
    getById,
    create,
    updateById,
    softDeleteById,
    hardDeleteById
} = require("../repository/user");

const getAllController = async (req, res) => {
    try {
        const users = await getAll();

        res.status(200).json({
            status: "successfully get all users",
            data: users,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

const getByIdController = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await getById(id);

        res.status(200).json({
            status: "successfully retrieved user by id",
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

const createController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const hashedPassword = hashPassword(password);

        const data = {
            email: email,
            password: hashedPassword,
        };

        const user = await create(data);

        res.status(201).json({
            status: "successfully create new user",
            data: user,
        });
    } catch (error) {
        if (error.message === "email and password are required") {
            res.status(400).json({
                status: "error",
                message: "email and password are required",
            });
        } else if (error.message.startsWith("\nInvalid")) {
            res.status(400).json({
                status: "error",
                message: "email already exists",
            });
        } else {
            res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }
}

const updateByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, phone_number } = req.body;

        const data = {
            name: name,
            phoneNumber: phone_number,
        };

        const user = await updateById(id, data);

        res.status(200).json({
            status: "successfully update user by id",
            data: user,
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

        if (forceDelete === "true") {
            await hardDeleteById(id); 
            res.status(200).json({
                status: "successfully hard delete user by id",
            });
        } else {
            await softDeleteById(id);
            res.status(200).json({
                status: "successfully soft delete user by id",
            });
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
};