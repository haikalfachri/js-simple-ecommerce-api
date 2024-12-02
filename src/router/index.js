const express = require("express");
const router = express.Router();

const userRouter = require("./user");
const productRouter = require("./product");
const categoryRouter = require("./category");
const authRouter = require("./auth");
const transactionRouter = require("./transaction");
const midtransRouter = require("./midtrans");

router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/categories", categoryRouter);
router.use("/auth", authRouter);
router.use("/transactions", transactionRouter);
router.use("/midtrans", midtransRouter);

module.exports = router;