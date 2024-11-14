const { z } = require('zod');

const authenticationSchema = z.object({
    email: z.string().email({ message: "invalid email" }),
    password: z.string().min(6, { message: "password must contain at least 6 characters." }),
});

const userInfoSchema = z.object({
    name: z.string().min(1, { message: "name must contain at least 1 characters." }),
    phone_number: z.string().min(8, { message: "phone number must contain at least 8 characters." }).max(15, { message: "Password must contain maximum 15 characters." }),
});

const idSchema = z.object({
    id: z.string().cuid(), 
});

module.exports = {
    idSchema,
    authenticationSchema,
    userInfoSchema,
};
