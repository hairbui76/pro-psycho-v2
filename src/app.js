const fastify = require("fastify");
const cookie = require("@fastify/cookie");
const cors = require("@fastify/cors");
// const middie = require("@fastify/middie");
const fastifyMultipart = require("@fastify/multipart");
const { errorHandler, notFoundHandler } = require("#middlewares");

const { db, config, route } = require("#configs");
const { Router } = require("#utils");
const { connectRedis } = require("#configs/redis");

/**
 *
 * @param {*} opts
 * @returns {import("fastify").FastifyInstance}
 */
const appInit = async (opts = {}) => {
	const app = fastify(opts);

	/* ------------- Enable middlewares support ------------- */
	// await app.register(middie);

	/* ---------- add multipart support (form-data) --------- */
	app.register(fastifyMultipart, {
		attachFieldsToBody: true,
		throwFileSizeLimit: false,
	});

	/* -------------------- register cors ------------------- */
	app.register(cors, {
		origin: true,
		credentials: true,
	});

	/* ------------------- register cookie ------------------ */
	app.register(cookie, {
		secret: config.COOKIE.SECRET,
		parseOptions: {},
	});

	/* ----------------- connect to database ---------------- */
	await app.register(db);

	/* ------------------ connect to redis ------------------ */
	await app.register(connectRedis);

	app.decorate("router", function () {
		return new Router(this);
	});

	/* -------------------- setup routes -------------------- */
	app.register(route);

	/* --------------- not found route handler -------------- */
	app.setNotFoundHandler(notFoundHandler);
	/* -------------------- error handler ------------------- */
	app.setErrorHandler(errorHandler);

	return app;
};

module.exports = appInit;
