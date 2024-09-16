const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY;
const expiresIn = "1h";

const generateToken = (payload) => {
    return jwt.sign(payload, secretKey, { expiresIn });
}

const verifyToken = (token) => {
    return jwt.verify(token, secretKey);
}

module.exports = {
    generateToken,
    verifyToken,
};