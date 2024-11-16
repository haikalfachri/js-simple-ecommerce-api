const { z } = require('zod');

const authenticationUpdateSchema = z.object({
    email: z.string().email({ message: "invalid email" }).optional(),
    password: z.string().min(6, { message: "password must contain at least 6 characters." }).optional(),
});

const userInfoUpdateSchema = z.object({
    name: z.string().min(1, { message: "name must contain at least 1 character." }).optional(),
    phone_number: z.string()
        .min(8, { message: "phone number must contain at least 8 characters." })
        .max(15, { message: "phone number must contain a maximum of 15 characters." })
        .optional(),
});

const idSchema = z.object({
    id: z.string().cuid(),
});

const buyProductSchema = z.object({
    quantity: z.number().int().positive(),
    product_id: z.string().cuid(),
    user_id: z.string().cuid(),
});

const productUpdateSchema = z.object({
    name: z.string().min(1, { message: "name must contain at least 1 character." }),
    price: z.number({ message: "price must be a number." }).int().positive({ message: "price must be a positive number." }).optional(),
    stock: z.number({ message: "stock must be a number." }).int().positive({ message: "stock must be a positive number." }).optional(),
    category_id: z.string().cuid().optional(),
});

module.exports = {
    idSchema,
    authenticationUpdateSchema,
    userInfoUpdateSchema,
    buyProductSchema,
    productUpdateSchema,
};
