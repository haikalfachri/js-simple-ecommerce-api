const express = require("express");

const {
    registerController,
    loginController,
    updateAuthenticationInfoController,
} = require("../controller/auth");
const { authMiddleware } = require("../middleware/auth");
const { idSchema, authenticationSchema } = require("../utils/zod");
const validationMiddleware = require("../middleware/validator");

const authRouter = express.Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.put("/:id", authMiddleware, validationMiddleware(idSchema, 'params'), validationMiddleware(authenticationSchema, 'body'), updateAuthenticationInfoController);

module.exports = authRouter;