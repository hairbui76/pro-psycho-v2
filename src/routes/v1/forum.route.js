const { forumController } = require("#controllers");
const { verifyToken } = require("#middlewares");

const forumRoute = (fastify, _opts, done) => {
	fastify
		.router()
		.routeMap("/posts/:postId/comment/:commentId", { preHandler: verifyToken })
		.delete(forumController.deleteCommentById)
		.put(forumController.updateCommentById);
	fastify
		.router()
		.routeMap("/posts/:postId/reaction/:reactionId", {
			preHandler: verifyToken,
		})
		.delete(forumController.deleteReactionById)
		.put(forumController.updateReactionById);
	fastify.post(
		"/posts/:id/reaction",
		{ preHandler: verifyToken },
		forumController.reactionPostById
	);
	fastify.post(
		"/posts/:id/comment",
		{ preHandler: verifyToken },
		forumController.commentPostById
	);
	fastify.get("/posts/:id", forumController.getPostById);
	fastify
		.router()
		.routeMap("/posts/:id", { preHandler: verifyToken })
		.delete(forumController.deletePostById)
		.put(forumController.updatePostById);
	fastify
		.router()
		.routeMap("/posts")
		.get(forumController.getAllPosts)
		.post({ preHandler: verifyToken }, forumController.createNewPost);
	done();
};

module.exports = forumRoute;
