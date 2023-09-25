const { authController } = require("#controllers");
const { verifyToken } = require("#middlewares");

const authRoute = (fastify, _opts, done) => {
	fastify.get("/", { preHandler: verifyToken }, authController.auth);
	fastify.post("/login", authController.login);
	fastify.post("/register", authController.register);
	fastify.get("/logout", authController.logout);
	done();
};

module.exports = authRoute;
