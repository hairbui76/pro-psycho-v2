const fastify = require("fastify");
const cookie = require("@fastify/cookie");
const cors = require("@fastify/cors");
const fastifyMultipart = require("@fastify/multipart");
const { errorHandler, notFoundHandler } = require("#middlewares");

const { db, config } = require("#configs");
const routes = require("#routes");
const { Router } = require("#utils");
const { connectRedis } = require("#configs/redis");

/**
 *
 * @param {*} opts
 * @returns {import("fastify").FastifyInstance}
 */
const appInit = async (opts = {}) => {
	const app = fastify(opts);

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

	/* ----------------- get signed cookies ----------------- */
	app.addHook("onRequest", (request, _reply, done) => {
		const { cookies } = request;
		const signedCookies = {};
		for (const key in cookies) {
			signedCookies[key] = request.unsignCookie(cookies[key]).value;
		}
		request.signedCookies = signedCookies;
		done();
	});

	/* -------------------- setup routes -------------------- */
	app.register(routes);

	/* --------------- not found route handler -------------- */
	app.setNotFoundHandler(notFoundHandler);
	/* -------------------- error handler ------------------- */
	app.setErrorHandler(errorHandler);

	return app;
};

module.exports = appInit;
