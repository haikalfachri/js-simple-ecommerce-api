const express = require("express");
const {
    getAllController,
    getByIdController,
    createController,
    updateByIdController,
    deleteByIdController,
    loginController,
} = require("../controller/user");

const userRouter = express.Router();

userRouter.get("/", getAllController);
userRouter.get("/:id", getByIdController);
userRouter.post("/", createController);
userRouter.delete("/:id", deleteByIdController);
userRouter.put("/:id", updateByIdController);
userRouter.post("/login", loginController);

module.exports = userRouter;