const mongoose = require("#configs/mongoose");
const Schema = mongoose.Schema;

const types = {
	1: "book",
	2: "magazine",
	3: "podcast",
	4: "music",
	5: "document",
};

const ResourceSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		type: {
			type: Number,
			enum: [1, 2, 3, 4, 5],
			get: (v) => types[v],
			set: (v) => Object.keys(types).find((key) => types[key] === v),
			required: true,
		},
		filename: {
			type: String,
			required: true,
		},
		uploadedBy: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
	},
	{ timestamps: true }
);

const Resource = mongoose.model("Resource", ResourceSchema);

module.exports = Resource;
