const express = require("express");
const router = express.Router();

const userRouter = require("./user");
// const productRouter = require("./product");
const authRouter = require("./auth");

router.use("/users", userRouter);
// router.use("/products", productRouter);
router.use("/auth", authRouter);

module.exports = router;