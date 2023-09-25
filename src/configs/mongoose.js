const mongoose = require("mongoose");
const globalTransform = (doc, ret) => {
	ret.id = ret._id;
	delete ret._id;
	delete ret.__v;
};
mongoose.constructor.prototype.globalTransform = globalTransform;
mongoose.set("toJSON", { transform: globalTransform });
mongoose.set("toObject", { transform: globalTransform });

mongoose.Aggregate.prototype.set = function (opts) {
	return this.append({ $set: opts });
};

mongoose.Aggregate.prototype.unsetCustom = function () {
	return this.append(
		{ $set: { id: "$_id" } },
		{ $project: { _id: 0, __v: 0 } }
	);
};

mongoose.Aggregate.prototype.lookupPipeline = function (pipeline, ...args) {
	return this.append({ $lookup: { pipeline, ...args } });
};

mongoose.Schema.prototype.createJoiValidation = function () {
	return this.obj;
};

module.exports = mongoose;
