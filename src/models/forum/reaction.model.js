const mongoose = require("#configs/mongoose");
const Schema = mongoose.Schema;

const types = {
	1: "like",
	2: "dislike",
	3: "love",
};

const ReactionSchema = new Schema(
	{
		type: {
			type: Number,
			enum: [1, 2, 3],
			get: (v) => types[v],
			set: (v) => Object.keys(types).find((key) => types[key] === v),
			default: 1,
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
	{
		timestamps: true,
		toObject: {
			transform: function (doc, ret) {
				mongoose.globalTransform(doc, ret);
				ret.type = types[ret.type];
			},
		},
		toJSON: {
			transform: function (doc, ret) {
				mongoose.globalTransform(doc, ret);
				ret.type = types[ret.type];
			},
		},
	}
);

const Reaction = mongoose.model("Reaction", ReactionSchema);

module.exports = Reaction;
