const { V3 } = require("paseto");

const encode = (payload, key, opts) => V3.encrypt(payload, key, opts);

const decode = (token, key) => V3.decrypt(token, key);

module.exports = { encode, decode };
