const routes = require("#routes");

const route = (fastify, _opts, done) => {
	fastify.get("/", (_request, reply) => {
		return reply.send("Hello world!");
	});
	fastify.register(routes);

	done();
};

module.exports = route;
