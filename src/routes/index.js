const v1 = require("./v1");

const routes = (fastify, _opts, done) => {
	fastify.register(v1, { prefix: "/v1" });
	done();
};

module.exports = routes;
