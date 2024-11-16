const validationMiddleware = (schema, property = 'body') => (req, res, next) => {
    try {
        schema.parse(req[property]);
        next();
    } catch (err) {
        res.status(400).json({
            status: 'validation error',
            message: err.errors.map((error) => error.message.toLowerCase()).join(', '),
        });
    }
};

module.exports = validationMiddleware;