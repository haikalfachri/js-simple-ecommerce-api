const { z } = require('zod');

const emailSchema = z.string().email();
const passwordSchema = z.string().min(8);

const idSchema = z.object({
    id: z.string().cuid(), 
});

module.exports = {
    idSchema,
    emailSchema,
    passwordSchema,
};
