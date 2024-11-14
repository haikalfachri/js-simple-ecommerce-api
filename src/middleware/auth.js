const { verifyToken } = require('../utils/jwt');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            status: "unauthorized",
            message: "access denied. no token provided."
        });
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            status: "unauthorized",
            message: "invalid token or token expired."
        });
    }
};

const adminMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            status: "unauthorized",
            message: "access denied. no token provided."
        });
    }

    try {
        const decoded = verifyToken(token);
        if (decoded.role !== "ADMIN") {
            return res.status(403).json({
                status: "forbidden",
                message: "access denied. admins only."
            });
        }
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            status: "unauthorized",
            message: "invalid token or token expired."
        });
    }
};

module.exports = {
    authMiddleware,
    adminMiddleware,
};