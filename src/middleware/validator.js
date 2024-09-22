const validationMiddleware = (schema, property = 'body') => (req, res, next) => {
    try {
        schema.parse(req[property]);
        next();
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err.errors.map((error) => error.message).join(', '),
        });
    }
};

module.exports = validationMiddleware;