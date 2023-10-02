const userController = require("#controllers/user.controller");
const { verifyTokenHandler } = require("#middlewares");

const userRoute = (fastify, _opts, done) => {
	fastify.put(
		"/password",
		{ preHandler: verifyTokenHandler },
		userController.updateUserPassword
	);
	fastify
		.router()
		.routeMap("/", { preHandler: verifyTokenHandler })
		.get(userController.getUser)
		.put(userController.updateUser);
	done();
};

module.exports = userRoute;
