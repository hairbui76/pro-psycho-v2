const { Post, Comment, Reaction } = require("##models/forum");
const { ApiError } = require("#utils");
const mongoose = require("#configs/mongoose");
const { upload } = require("#configs/cloudinary");
const httpStatus = require("http-status");

const getAllPosts = async (request, reply) => {
	const posts = await Post.aggregate()
		.lookup({
			from: "users",
			localField: "createdBy",
			foreignField: "_id",
			pipeline: [
				{ $set: { id: "$_id" } },
				{
					$project: {
						_id: 0,
						password: 0,
						__v: 0,
					},
				},
			],
			as: "createdBy",
		})
		.unwind("createdBy")
		.lookup({
			from: "comments",
			localField: "_id",
			foreignField: "post",
			pipeline: [
				{ $set: { id: "$_id" } },
				{
					$project: {
						_id: 0,
						__v: 0,
					},
				},
			],
			as: "comments",
		})
		.lookup({
			from: "reactions",
			localField: "_id",
			foreignField: "post",
			pipeline: [
				{ $set: { id: "$_id" } },
				{
					$project: {
						_id: 0,
						__v: 0,
					},
				},
			],
			as: "reactions",
		})
		.unsetCustom();
	return reply.code(httpStatus.OK).send({
		message: "Success",
		data: posts,
	});
};

const getPostById = async (request, reply) => {
	const { id } = request.params;
	const post = await Post.aggregate()
		.match({
			_id: new mongoose.Types.ObjectId(id),
		})
		.lookup({
			from: "users",
			localField: "createdBy",
			foreignField: "_id",
			pipeline: [
				{ $set: { id: "$_id" } },
				{
					$project: {
						_id: 0,
						password: 0,
						__v: 0,
					},
				},
			],
			as: "createdBy",
		})
		.lookup({
			from: "comments",
			localField: "_id",
			foreignField: "post",
			pipeline: [
				{
					$lookup: {
						from: "users",
						localField: "createdBy",
						foreignField: "_id",
						pipeline: [
							{ $set: { id: "$_id" } },
							{
								$project: {
									_id: 0,
									password: 0,
									__v: 0,
								},
							},
						],
						as: "createdBy",
					},
				},
				{ $set: { id: "$_id" } },
				{ $project: { _id: 0, __v: 0 } },
			],
			as: "comments",
		})
		.lookup({
			from: "reactions",
			localField: "_id",
			foreignField: "post",
			pipeline: [
				{
					$lookup: {
						from: "users",
						localField: "createdBy",
						foreignField: "_id",
						pipeline: [
							{ $set: { id: "$_id" } },
							{
								$project: {
									_id: 0,
									password: 0,
									__v: 0,
								},
							},
						],
						as: "createdBy",
					},
				},
				{ $set: { id: "$_id" } },
				{ $project: { _id: 0, __v: 0 } },
			],
			as: "reactions",
		})
		.unwind("createdBy")
		.unsetCustom();
	return reply.code(httpStatus.OK).send({
		message: "Success",
		data: post,
	});
};

const createNewPost = async (request, reply) => {
	const post = {};
	if (request.body.title) post.title = request.body.title.value;
	if (request.body.content) post.content = request.body.content.value;
	if (request.body.image) {
		const { url } = await upload(request.body.image);
		post.imgUrl = url;
	}
	const newPost = new Post({ ...post, createdBy: request.user.id });
	await newPost.save();
	return reply.code(httpStatus.OK).send({
		message: "Success",
		data: newPost,
	});
};

const updatePostById = async (request, reply) => {
	const { id } = request.params;
	const post = await Post.findById(id);
	if (!post) throw new ApiError(httpStatus.NOT_FOUND, "Post not found");
	if (request.body.title) post.title = request.body.title.value;
	if (request.body.content) post.content = request.body.content.value;
	if (request.body.image) {
		const { url } = await upload(request.body.image);
		post.imgUrl = url;
	}
	await post.save();
	return reply.code(httpStatus.OK).send({
		message: "Update post successfully",
		data: post,
	});
};

const deletePostById = async (request, reply) => {
	const { id } = request.params;
	const post = await Post.findByIdAndDelete(id);
	if (!post) throw new ApiError(httpStatus.NOT_FOUND, "Post not found");
	await Promise.all([
		Comment.deleteMany({ post: id }),
		Reaction.deleteMany({ post: id }),
	]);
	// console.log(commentCount, reactionCount);
	return reply.code(httpStatus.OK).send({
		message: "Delete post successfully",
	});
};

const commentPostById = async (request, reply) => {
	const { id } = request.params;
	const { content } = request.body;
	const post = await Post.findById(id);
	if (!post) throw new ApiError(httpStatus.NOT_FOUND, "Post not found");
	const comment = new Comment({
		content,
		createdBy: request.user.id,
		post: id,
	});
	await comment.save();
	return reply.code(httpStatus.OK).send({
		message: "Success",
		data: comment,
	});
};

const deleteCommentById = async (request, reply) => {
	const { commentId } = request.params;
	await Comment.findByIdAndDelete(commentId);
	return reply.code(httpStatus.OK).send({
		message: "Delete comment successfully",
	});
};

const updateCommentById = async (request, reply) => {
	const { commentId, postId } = request.params;
	const { content } = request.body;
	const post = await Post.findById(postId);
	if (!post) throw new ApiError(httpStatus.NOT_FOUND, "Post not found");
	const comment = await Comment.findByIdAndUpdate(
		commentId,
		{ content },
		{ new: true }
	);
	return reply.code(httpStatus.OK).send({
		message: "Update comment successfully",
		data: comment,
	});
};

const reactionPostById = async (request, reply) => {
	const { id } = request.params;
	const { type } = request.body;
	const post = await Post.findById(id);
	if (!post) throw new ApiError(httpStatus.NOT_FOUND, "Post not found");
	const reactionPost = new Reaction({
		type,
		createdBy: request.user.id,
		post: id,
	});
	await reactionPost.save();
	return reply.code(httpStatus.OK).send({
		message: "Success",
		data: reactionPost,
	});
};

const deleteReactionById = async (request, reply) => {
	const { reactionId } = request.params;
	await Reaction.findByIdAndDelete(reactionId);
	return reply.code(httpStatus.OK).send({
		message: "Delete reaction successfully",
	});
};

const updateReactionById = async (request, reply) => {
	const { reactionId } = request.params;
	const { type } = request.body;
	const reactionPost = await Reaction.findByIdAndUpdate(
		reactionId,
		{ type },
		{ new: true }
	);
	return reply.code(httpStatus.OK).send({
		message: "Update reaction successfully",
		data: reactionPost,
	});
};

module.exports = {
	getAllPosts,
	getPostById,
	createNewPost,
	updatePostById,
	deletePostById,
	commentPostById,
	deleteCommentById,
	updateCommentById,
	reactionPostById,
	deleteReactionById,
	updateReactionById,
};
