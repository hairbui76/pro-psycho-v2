const mongoose = require("#configs/mongoose");
const { DateTime } = require("luxon");
const Schema = mongoose.Schema;
const globalTransform = mongoose.globalTransform;

const UserSchema = new Schema(
	{
		username: { type: String, unique: true },
		firstName: { type: String, required: true },
		surName: { type: String, required: true },
		dateOfBirth: {
			type: Date,
			set: (date) => DateTime.fromISO(date).toJSDate(),
		},
		phoneNumber: { type: String, unique: true },
		email: { type: String, unique: true },
		address: String,
		password: String,
		avatarUrl: String,
		thumbnailUrl: String,
		role: { type: String, default: "user" },
	},
	{
		toJSON: {
			transform: (doc, ret) => {
				globalTransform(doc, ret);
				delete ret.password;
			},
		},
		toObject: {
			transform: (doc, ret) => {
				globalTransform(doc, ret);
				delete ret.password;
			},
		},
	}
);

const schemaType = UserSchema.createJoiValidation();
console.log(JSON.stringify(schemaType));

UserSchema.methods.getAccessTokenPayload = function () {
	return {
		id: this._id,
		firstName: this.firstName,
		surName: this.surName,
		username: this.username,
		avatarUrl: this.avatarUrl,
		role: this.role,
	};
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
