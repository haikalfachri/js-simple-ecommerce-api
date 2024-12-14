const express = require("express");

const {
    getAllController,
    getByIdController,
    createController,
    updateByIdController,
    deleteByIdController,
} = require("../controller/user");

const { idSchema, userInfoUpdateSchema } = require("../utils/zod");

const validationMiddleware = require("../middleware/validator");

const { uploadMiddleware } = require("../middleware/multer");

const { authMiddleware,
        adminMiddleware
} = require("../middleware/auth");

const userRouter = express.Router();

userRouter.get("/", adminMiddleware, getAllController);
userRouter.get('/:id', adminMiddleware, validationMiddleware(idSchema, 'params'), getByIdController);
userRouter.post(
    "/", 
    adminMiddleware,
    (req, res, next) => {
        req.folder = "user";
        next();
    },
    uploadMiddleware.single("image_url"), 
    createController);
userRouter.delete("/:id", adminMiddleware, deleteByIdController);
userRouter.put(
    "/:id", 
    authMiddleware, 
    validationMiddleware(idSchema, 'params'), 
    validationMiddleware(userInfoUpdateSchema, 'body'),
    (req, res, next) => {
        req.folder = "user";
        next();
    },
    uploadMiddleware.single("image_url"), 
    updateByIdController);

module.exports = userRouter;