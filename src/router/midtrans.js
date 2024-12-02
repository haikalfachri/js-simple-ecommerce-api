const express = require("express");

const {
    midtransPayment,
    handleMidtransNotification
} = require("../controller/midtrans");

const midtransRouter = express.Router();

midtransRouter.post('/notification', midtransPayment);
midtransRouter.post('/notification/handle', handleMidtransNotification);

module.exports = midtransRouter;