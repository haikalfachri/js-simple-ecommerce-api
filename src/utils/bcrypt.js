const bcrypt = require('bcrypt');
const cost = 10;

const hashPassword = (password) => {
    return bcrypt.hashSync(password, cost);
};

const checkPassword = (password, inputPassword) => {
    return bcrypt.compareSync(password, inputPassword);
};

module.exports = {
    hashPassword,
    checkPassword,
};