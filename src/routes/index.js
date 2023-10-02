const v1 = require("./v1");

const routes = (fastify, _opts, done) => {
	fastify.get("/", (_request, reply) => {
		return reply.send("Hello world!");
	});

	fastify.register(v1, { prefix: "/v1" });
	done();
};

module.exports = routes;
