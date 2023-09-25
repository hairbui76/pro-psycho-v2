const userController = require("#controllers/user.controller");
const { verifyToken } = require("#middlewares");

const userRoute = (fastify, _opts, done) => {
	fastify.put(
		"/password",
		{ preHandler: verifyToken },
		userController.updateUserPassword
	);
	fastify
		.router()
		.routeMap("/", { preHandler: verifyToken })
		.get(userController.getUser)
		.put(userController.updateUser);
	done();
};

module.exports = userRoute;
