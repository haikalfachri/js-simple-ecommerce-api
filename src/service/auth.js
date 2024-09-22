const {
    create,
    getByEmail,
} = require("../model/auth");

const registerService = async (data) => {
    const user = await create(data);

    return user;
}

const getByEmailService = async (email) => {
    const user = await getByEmail(email);

    return user;
}

module.exports = {
    registerService,
    getByEmailService,
};