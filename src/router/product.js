const express = require('express');

const {
    getAllController,
    getByIdController,
    createController,
    updateByIdController,
    deleteByIdController,
} = require('../controller/product');

const { idSchema } = require('../utils/zod');

const validationMiddleware  = require('../middleware/validator');

const { uploadMiddleware } = require('../middleware/multer');

const { 
    authMiddleware,
    adminMiddleware,
} = require('../middleware/auth');

const productRouter = express.Router();

productRouter.get('/', adminMiddleware, getAllController);
productRouter.get('/:id', adminMiddleware, validationMiddleware(idSchema, 'params'), getByIdController);
productRouter.post(
    '/',
    adminMiddleware,
    (req, res, next) => {
        req.folder = "product";
        next();
    },
    uploadMiddleware.single("image_url"), 
    createController
);
productRouter.delete('/:id', adminMiddleware, validationMiddleware(idSchema, 'params'), deleteByIdController);
productRouter.put('/:id', 
    authMiddleware, 
    validationMiddleware(idSchema, 'params'),
    (req, res, next) => {
        req.folder = "product";
        next();
    },
    uploadMiddleware.single("image_url"), 
    updateByIdController
);

module.exports = productRouter;
