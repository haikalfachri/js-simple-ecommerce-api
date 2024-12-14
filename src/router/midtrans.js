const express = require("express");

const {
    midtransPayment,
    handleMidtransNotification
} = require("../controller/midtrans");

const midtransRouter = express.Router();

midtransRouter.post('/notifications', midtransPayment);
midtransRouter.post('/notifications/handles', handleMidtransNotification);

module.exports = midtransRouter;