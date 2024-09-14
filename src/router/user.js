const express = require("express");
const {
    getAllController,
    getByIdController,
    createController,
    updateByIdController,
    deleteByIdController,
} = require("../controller/user");

const userRouter = express.Router();

userRouter.get("/", getAllController);
userRouter.get("/:id", getByIdController);
userRouter.post("/", createController);
userRouter.delete("/:id", deleteByIdController);
userRouter.put("/:id", updateByIdController);

module.exports = userRouter;