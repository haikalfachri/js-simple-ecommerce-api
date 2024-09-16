const {
    hashPassword,
    checkPassword,
} = require("../utils/bcrypt");

const {
    generateToken,
    verifyToken,
} = require("../utils/jwt");

const {
    getAllService,
    getByIdService,
    createService,
    updateByIdService,
    deleteByIdService,
    getByEmailService,
} = require("../service/user");

const getAllController = async (res) => {
    try {
        const users = await getAllService();

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
        const user = await getByIdService(id);

        res.status(200).json({
            status: "successfully get user by id",
            data: user,
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
        const userData = req.body;

        if (!userData.email || !userData.password) {
            throw new Error("Email and password are required");
        }

        const hashedPassword = hashPassword(userData.password);

        userData.password = hashedPassword;

        const user = await createService(userData);

        res.status(201).json({
            status: "successfully create new user",
            data: user,
        });
    } catch (error) {
        if (error.message === "Email and password are required") {
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
        const data = req.body;
        const user = await updateByIdService(id, data);

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
        const user = await deleteByIdService(id);

        res.status(200).json({
            status: "successfully delete user by id",
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
}

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error("Email and password are required");
        }

        const user = await getByEmailService(email);

        if (!user) {
            throw new Error("Invalid email or password");
        }

        const isPasswordMatch = checkPassword(password, user.password);

        if (!isPasswordMatch) {
            throw new Error("Invalid email or password");
        }

        const token = generateToken({
            id: user.id,
            email: user.email,
        });

        res.status(200).json({
            status: "successfully login",
            data: {
                token: token,
            },
        });
    } catch (error) {
        if (error.message === "Email and password are required") {
            res.status(400).json({
                status: "error",
                message: "email and password are required",
            });
        } else if (error.message === "Invalid email or password") {
            res.status(400).json({
                status: "error",
                message: "invalid email or password",
            });
        } else {
            res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }
}

module.exports = {
    getAllController,
    getByIdController,
    createController,
    updateByIdController,
    deleteByIdController,
    loginController,
};