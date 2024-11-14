const express = require("express");

const {
    getAllController,
    getByIdController,
    createController,
    updateByIdController,
    deleteByIdController,
} = require("../controller/user");

const { idSchema, userInfoSchema } = require("../utils/zod");

const validationMiddleware = require("../middleware/validator");

const { authMiddleware,
        adminMiddleware
} = require("../middleware/auth");

const userRouter = express.Router();

userRouter.get("/", adminMiddleware, getAllController);
userRouter.get('/:id', adminMiddleware, validationMiddleware(idSchema, 'params'), getByIdController);
userRouter.post("/", adminMiddleware,createController);
userRouter.delete("/:id", adminMiddleware, deleteByIdController);
userRouter.put("/:id", authMiddleware, validationMiddleware(userInfoSchema, 'body'), updateByIdController);

module.exports = userRouter;