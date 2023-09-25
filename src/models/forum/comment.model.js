const mongoose = require("#configs/mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
	{
		content: {
			type: String,
			required: true,
		},
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		post: {
			type: Schema.Types.ObjectId,
			ref: "Post",
			required: true,
		},
	},
	{ timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
