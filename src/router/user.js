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

const { authMiddleware,
        adminMiddleware
} = require("../middleware/auth");

const userRouter = express.Router();

userRouter.get("/", adminMiddleware, getAllController);
userRouter.get('/:id', validationMiddleware(idSchema, 'params'), adminMiddleware, getByIdController);
userRouter.post("/", adminMiddleware,createController);
userRouter.delete("/:id", adminMiddleware, deleteByIdController);
userRouter.put("/:id", authMiddleware, updateByIdController);

module.exports = userRouter;