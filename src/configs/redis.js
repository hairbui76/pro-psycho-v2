const Redis = require("ioredis");
/**
 * @type {import("ioredis").Redis}
 */
const redisClient = new Redis();

const connectRedis = async (_fastify, _opts) => {
	const ping = await redisClient.ping();
	if (ping !== "PONG") throw new Error("Connect to redis failed");
	console.log("Connected to redis");
};

module.exports = {
	connectRedis,
	redisClient,
};
