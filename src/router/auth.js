const express = require("express");

const {
    registerController,
    loginController,
} = require("../controller/auth");

const authRouter = express.Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);

module.exports = authRouter;