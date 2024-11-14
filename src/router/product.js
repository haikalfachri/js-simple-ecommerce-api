const express = require('express');

const {
    getAllController,
    getByIdController,
    createController,
    updateByIdController,
    deleteByIdController,
} = require('../controller/product');

const { idSchema } = require('../utils/zod');

const validationMiddleware = require('../middleware/validator');

const { authMiddleware,
        adminMiddleware
} = require('../middleware/auth');

const productRouter = express.Router();

productRouter.get('/', adminMiddleware, getAllController);
productRouter.get('/:id', adminMiddleware, validationMiddleware(idSchema, 'params'), getByIdController);
productRouter.post('/', adminMiddleware, createController);
productRouter.delete('/:id', adminMiddleware, deleteByIdController);
productRouter.put('/:id', authMiddleware, updateByIdController);

module.exports = productRouter;
