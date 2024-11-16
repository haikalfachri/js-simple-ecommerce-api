const express = require("express");

const {
    getAllController,
    getByIdController,
    createController,
    updateByIdController,
    deleteByIdController,
} = require("../controller/category");

const { idSchema } = require("../utils/zod");

const validationMiddleware = require("../middleware/validator");

const { authMiddleware,
        adminMiddleware
} = require("../middleware/auth");

const categoryRouter = express.Router();

categoryRouter.get("/", adminMiddleware, getAllController);
categoryRouter.get('/:id', adminMiddleware, validationMiddleware(idSchema, 'params'), getByIdController);
categoryRouter.post("/", adminMiddleware,createController);
categoryRouter.delete("/:id", adminMiddleware, validationMiddleware(idSchema, 'params'), deleteByIdController);
categoryRouter.put("/:id", authMiddleware, validationMiddleware(idSchema, 'params'), updateByIdController);

module.exports = categoryRouter;