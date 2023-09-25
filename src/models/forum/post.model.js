const mongoose = require("#configs/mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		imgUrl: {
			type: String,
			default: "",
		},
		createdBy: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
	},
	{ timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
