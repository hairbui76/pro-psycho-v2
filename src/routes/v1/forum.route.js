const { forumController } = require("#controllers");
const { verifyTokenHandler } = require("#middlewares");

const forumRoute = (fastify, _opts, done) => {
	fastify
		.router()
		.routeMap("/posts/:postId/comment/:commentId", {
			preHandler: verifyTokenHandler,
		})
		.delete(forumController.deleteCommentById)
		.put(forumController.updateCommentById);
	fastify
		.router()
		.routeMap("/posts/:postId/reaction/:reactionId", {
			preHandler: verifyTokenHandler,
		})
		.delete(forumController.deleteReactionById)
		.put(forumController.updateReactionById);
	fastify.post(
		"/posts/:id/reaction",
		{ preHandler: verifyTokenHandler },
		forumController.reactionPostById
	);
	fastify.post(
		"/posts/:id/comment",
		{ preHandler: verifyTokenHandler },
		forumController.commentPostById
	);
	fastify.get("/posts/:id", forumController.getPostById);
	fastify
		.router()
		.routeMap("/posts/:id", { preHandler: verifyTokenHandler })
		.delete(forumController.deletePostById)
		.put(forumController.updatePostById);
	fastify
		.router()
		.routeMap("/posts")
		.get(forumController.getAllPosts)
		.post({ preHandler: verifyTokenHandler }, forumController.createNewPost);
	done();
};

module.exports = forumRoute;
