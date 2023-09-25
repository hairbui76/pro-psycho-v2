const { TOKEN } = require("#configs/config");
const { encode } = require("#configs/paseto");
const argon2 = require("argon2");

const generateAccessToken = (payload) =>
	encode(payload, TOKEN.SECRET, {
		expiresIn: "1 hour",
	});

const verifyPassword = (password, hash) => argon2.verify(hash, password);

module.exports = { generateAccessToken, verifyPassword };
