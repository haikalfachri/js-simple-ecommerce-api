const express = require("express");
const router = express.Router();

const userRouter = require("./user");
const productRouter = require("./product");
const categoryRouter = require("./category");
const authRouter = require("./auth");

router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/categories", categoryRouter);
router.use("/auth", authRouter);

module.exports = router;