const resourceController = require("#controllers/resource.controller");
const { verifyTokenHandler } = require("#middlewares");

const resourceRoute = (fastify, _opts, done) => {
	fastify.post(
		"/upload",
		{ preHandler: verifyTokenHandler },
		resourceController.uploadResource
	);
	fastify.get("/download/:fileKey", resourceController.downloadResource);
	done();
};

module.exports = resourceRoute;
