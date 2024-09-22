const {
    registerService,
    getByEmailService,
} = require('../service/auth');

const {
    hashPassword,
    checkPassword,
} = require("../utils/bcrypt");

const {
    generateToken,
} = require("../utils/jwt");


const registerController = async (req, res) => {
    try {
        const userData  = req.body;

        if (!userData.email || !userData.password) {
            throw new Error("Email and password are required");
        }

        const hashedPassword = hashPassword(userData.password);

        userData.password = hashedPassword;

        const user = await registerService(userData);
        res.status(201).json({
            status: "successfully registered",
            data: user,
        });
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: error.message
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

        const token = generateToken(
            {
                id: user.id,
                email: user.email,
            },
            user.role
        );

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
    registerController,
    loginController,
};

