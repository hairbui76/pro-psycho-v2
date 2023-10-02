const { authController } = require("#controllers");
const { verifyTokenHandler } = require("#middlewares");

const authRoute = (fastify, _opts, done) => {
	fastify.get("/", { preHandler: verifyTokenHandler }, authController.auth);
	fastify.post("/login", authController.login);
	fastify.post("/register", authController.register);
	fastify.get("/logout", authController.logout);
	done();
};

module.exports = authRoute;
