const {
    create,
    getByEmail,
    updateAuthenticationInfo,
} = require('../repository/auth');

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
            throw new Error("email and password are required");
        }

        const hashedPassword = hashPassword(userData.password);

        userData.password = hashedPassword;

        const user = await create(userData);
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
            throw new Error("email and password are required");
        }

        const user = await getByEmail(email);

        if (!user) {
            throw new Error("invalid email or password");
        }

        const isPasswordMatch = checkPassword(password, user.password);

        if (!isPasswordMatch) {
            throw new Error("invalid email or password");
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
        if (error.message === "email and password are required") {
            res.status(400).json({
                status: "error",
                message: "email and password are required",
            });
        } else if (error.message === "invalid email or password") {
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

const updateAuthenticationInfoController = async (req, res) => {
    try {
        const { id } = req.params;

        const { email, password } = req.body;

        const hashedPassword = hashPassword(password);

        const userData = {
            email: email,
            password: hashedPassword,
        };

        const user = await updateAuthenticationInfo(id, userData);

        res.status(200).json({
            status: "successfully updated authentication info",
            data: user,
        });
    } catch (error) {
        if (error.message === "email and password are required") {
            res.status(400).json({
                status: "error",
                message: "email and password are required",
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
    updateAuthenticationInfoController,
};

