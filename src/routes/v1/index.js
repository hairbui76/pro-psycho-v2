const authRoute = require("./auth.route");
const forumRoute = require("./forum.route");
const resourceRoute = require("./resource.route");
const userRoute = require("./user.route");

const v1 = (fastify, _opts, done) => {
	fastify.register(forumRoute, { prefix: "/forum" });
	fastify.register(authRoute, { prefix: "/auth" });
	fastify.register(resourceRoute, { prefix: "/resource" });
	fastify.register(userRoute, { prefix: "/account" });
	done();
};

module.exports = v1;
