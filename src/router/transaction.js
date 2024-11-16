const express = require('express');

const {
    getAllController,
    getByIdController,
    createController,
    updateByIdController,
    deleteByIdController,
    buyProductController,
    transactionHistoryController,
} = require('../controller/transaction');

const { idSchema } = require('../utils/zod');

const validationMiddleware = require('../middleware/validator');

const { authMiddleware,
        adminMiddleware
} = require('../middleware/auth');

const transactionRouter = express.Router();

transactionRouter.get('/', adminMiddleware, getAllController);
transactionRouter.get('/:id', adminMiddleware, validationMiddleware(idSchema, 'params'), getByIdController);
transactionRouter.post('/', adminMiddleware, createController);
transactionRouter.delete('/:id', adminMiddleware, validationMiddleware(idSchema, 'params'), deleteByIdController);
transactionRouter.put('/:id', adminMiddleware, validationMiddleware(idSchema, 'params'), updateByIdController);
transactionRouter.post('/buy', authMiddleware, buyProductController);
transactionRouter.get('/history/:id', authMiddleware, validationMiddleware(idSchema, 'params'), transactionHistoryController);

module.exports = transactionRouter;