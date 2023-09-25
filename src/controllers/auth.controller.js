const { generateAccessToken } = require("#services/auth.service");
const { User } = require("#models");
const { TOKEN } = require("#configs/config");
const { uploadCloudinary } = require("#services/cloudinary.service");
const ApiError = require("#utils/ApiError");
const { DateTime } = require("luxon");
const argon2 = require("argon2");
const httpStatus = require("http-status");

const login = async (request, reply) => {
	const { username, password } = request.body;
	const user = await User.findOne({ username });
	if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
	const isPasswordValid = await argon2.verify(user.password, password);
	if (!isPasswordValid)
		throw new ApiError(
			httpStatus.UNAUTHORIZED,
			"Username or password is incorrect"
		);
	const token = await generateAccessToken(user.getAccessTokenPayload());
	return reply
		.code(httpStatus.ACCEPTED)
		.cookie("access_token", token, {
			expires: DateTime.now().plus({ hours: TOKEN.TOKEN_EXPIRE }).toJSDate(),
			httpOnly: true,
			signed: true,
			secure: false,
			path: "/",
		})
		.send({
			message: "Login successful",
			user,
		});
};

const register = async (request, reply) => {
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
	if (request.body.password)
		user.password = await argon2.hash(request.body.password.value);
	if (request.body.role) user.role = request.body.role.value;
	let avatarUpload;
	let thumbnailUpload;
	if (request.body.avatar) avatarUpload = uploadCloudinary(request.body.avatar);
	if (request.body.thumbnail)
		thumbnailUpload = uploadCloudinary(request.body.thumbnail);
	[avatarUpload, thumbnailUpload] = await Promise.all([
		avatarUpload,
		thumbnailUpload,
	]);
	if (avatarUpload) user.avatarUrl = avatarUpload.url;
	if (thumbnailUpload) user.thumbnailUrl = thumbnailUpload.url;
	const newUser = new User(user);
	await newUser.save();
	const token = await generateAccessToken(newUser.getAccessTokenPayload());
	return reply
		.code(httpStatus.ACCEPTED)
		.cookie("access_token", token, {
			expires: DateTime.now().plus({ hours: TOKEN.TOKEN_EXPIRE }).toJSDate(),
			httpOnly: true,
			signed: true,
			secure: false,
			path: "/",
		})
		.send({
			message: "Register successful",
			user: newUser,
		});
};

const logout = (request, reply) => {
	return reply.code(httpStatus.ACCEPTED).clearCookie("access_token").send({
		message: "Logout successful",
	});
};

const auth = async (request, reply) => {
	return reply.code(httpStatus.ACCEPTED).send({
		message: "Authorized",
		user: request.user,
	});
};

module.exports = {
	login,
	register,
	logout,
	auth,
};
