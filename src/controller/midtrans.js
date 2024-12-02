
require('dotenv').config();

const {
    payOrderMidtrans,
} = require('../repository/transaction');

const midtransPayment = async (req, res) => {
    try {
        const { order_id, transaction_status } = req.body;

        if (transaction_status === 'settlement') {
            const transaction = await payOrderMidtrans(order_id);
            res.status(200).json({
                status: 'transaction settled successfully',
                data: transaction,
            });
        } else if (transaction_status === 'expire') {
            res.status(200).json({
                status: "error",
                message: "transaction expired",
            });
        } else {
            res.status(200).json({
                status: "error",
                message: "transaction pending or denied",
            });
        }
    } catch (error) {
        res.status(200).json({
            status: "error",
            message: error.message,
        });
    }
}

const crypto = require('crypto');

const handleMidtransNotification = async (req, res) => {
    try {
        const notification = req.body;

        const { order_id, transaction_status } = notification;

        const input = `${order_id}${transaction_status}${process.env.MIDTRANS_SERVER_KEY}`;
        const calculatedSignature = crypto.createHash('sha512').update(input).digest('hex');

        // if (calculatedSignature !== process.env.MIDTRANS_SERVER_KEY) {
        //     return res.status(400).json({ message: "invalid signature" });
        // }

        // Handle different transaction statuses
        if (transaction_status === 'settlement') {
            // Payment successful
            transaction = await payOrderMidtrans(order_id);
        } else if (transaction_status === 'cancel' || transaction_status === 'expire' || transaction_status === 'deny') {
            // Payment failed or canceled
            await prisma.transaction.update({
                where: { id: order_id },
                data: { status: 'FAILED' },
            });
        }
        res.status(200).json({
            status: 'success',
            data: transaction,
        });
    } catch (error) {
        console.error('Error handling notification:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { midtransPayment, handleMidtransNotification };