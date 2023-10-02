const User = require("#models/user.model");
const { upload } = require("#configs/cloudinary");
const { verifyPassword } = require("#services/auth.service");
const { ApiError } = require("#utils");
const httpStatus = require("http-status");

const getUser = async (request, reply) => {
	const user = await User.findById(request.user.id);
	if (!user) throw new ApiError(404, "User not found");
	return reply.code(httpStatus.OK).send({
		message: "Get user successfully",
		data: user,
	});
};

const updateUser = async (request, reply) => {
	const user = {};
	if (request.body.username) user.username = request.body.username.value;
	if (request.body.firstName) user.firstName = request.body.firstName.value;
	if (request.body.surName) user.surName = request.body.surName.value;
	if (request.body.dateOfBirth)
		user.dateOfBirth = request.body.dateOfBirth.value;
	if (request.body.phoneNumber)
		user.phoneNumber = request.body.phoneNumber.value;
	if (request.body.email) user.email = request.body.email.value;
	if (request.body.address) user.address = request.body.address.value;
	if (request.body.role) user.role = request.body.role.value;
	let avatarUpload;
	let thumbnailUpload;
	if (request.body.avatar) avatarUpload = upload(request.body.avatar);
	if (request.body.thumbnail) thumbnailUpload = upload(request.body.thumbnail);
	[avatarUpload, thumbnailUpload] = await Promise.all([
		avatarUpload,
		thumbnailUpload,
	]);
	if (avatarUpload) user.avatar = avatarUpload.url;
	if (thumbnailUpload) user.thumbnail = thumbnailUpload.url;
	const updatedUser = await User.findByIdAndUpdate(request.user.id, user, {
		new: true,
	}).select("-password");
	return reply.code(httpStatus.OK).send({
		message: "Update user successfully",
		data: updatedUser,
	});
};

const updateUserPassword = async (request, reply) => {
	const { oldPassword, newPassword } = request.body;
	if (!oldPassword || !newPassword)
		throw new ApiError(httpStatus.BAD_REQUEST, "Password is required");
	const user = await User.findById(request.user.id);
	if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
	if (!verifyPassword(oldPassword, user.password))
		throw new ApiError(httpStatus.BAD_REQUEST, "Old password is incorrect");
	user.password = newPassword;
	await user.save();
	return reply.code(httpStatus.OK).send({
		message: "Update password successfully",
	});
};

module.exports = {
	getUser,
	updateUser,
	updateUserPassword,
};
