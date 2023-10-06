const Redis = require("ioredis");
const { REDIS } = require("./config");
/**
 * @type {import("ioredis").Redis}
 */
const redisClient = new Redis(REDIS.PORT, REDIS.HOST);

const connectRedis = async (_fastify, _opts) => {
	const ping = await redisClient.ping();
	if (ping !== "PONG") throw new Error("Connect to redis failed");
	console.log("Connected to redis");
};

module.exports = {
	connectRedis,
	redisClient,
};
