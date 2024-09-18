const { z } = require('zod');

const idSchema = z.string().cuid2();
const emailSchema = z.string().email();
const passwordSchema = z.string().min(8);

module.exports = {
    idSchema,
    emailSchema,
    passwordSchema,
};
