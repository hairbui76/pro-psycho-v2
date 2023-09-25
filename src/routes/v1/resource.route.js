const resourceController = require("#controllers/resource.controller");
const { verifyToken } = require("#middlewares");

const resourceRoute = (fastify, _opts, done) => {
	fastify.post(
		"/upload",
		{ preHandler: verifyToken },
		resourceController.uploadResource
	);
	fastify.get("/download/:fileKey", resourceController.downloadResource);
	done();
};

module.exports = resourceRoute;
