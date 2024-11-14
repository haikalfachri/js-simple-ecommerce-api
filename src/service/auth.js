const {
    create,
    getByEmail,
    updateAuthenticationInfo,
} = require("../model/auth");

const registerService = async (data) => {
    const user = await create(data);

    return user;
}

const getByEmailService = async (email) => {
    const user = await getByEmail(email);

    return user;
}

const updateAuthenticationInfoService = async (id, data) => {
    const user = await updateAuthenticationInfo(id, data);

    return user;
}

module.exports = {
    registerService,
    getByEmailService,
    updateAuthenticationInfoService,
};