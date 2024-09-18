const express = require("express");

const {
    getAllController,
    getByIdController,
    createController,
    updateByIdController,
    deleteByIdController,
    loginController,
} = require("../controller/user");

const { idSchema } = require("../utils/zod");

const validationMiddleware = require("../middleware/validator");

const userRouter = express.Router();

userRouter.get("/", getAllController);
// userRouter.get("/:id", getByIdController);
userRouter.get('/:id', validationMiddleware(idSchema, 'params'), getByIdController);
userRouter.post("/", createController);
userRouter.delete("/:id", deleteByIdController);
userRouter.put("/:id", updateByIdController);
userRouter.post("/login", loginController);

module.exports = userRouter;