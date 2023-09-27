const mongoose = require("./mongoose");
const config = require("./config");

const db = async (_fastify, _opts) => {
	mongoose.set("strictQuery", true);
	await mongoose.connect(config.DBUri, {
		dbName: config.DB.DATABASE,
	});
	console.log("Connected to mongodb");
};

module.exports = db;
