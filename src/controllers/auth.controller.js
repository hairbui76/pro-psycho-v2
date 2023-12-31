const authService = require("#services/auth.service");
const { ENV } = require("#configs/config");
const httpStatus = require("http-status");

const auth = async (request, reply) => {
	if (request.resetAccess) {
		const { accessToken, accessExp } = await authService.prepareAccessToken(
			request.user
		);
		return reply
			.cookie("token", accessToken, {
				path: "/",
				signed: true,
				secured: ENV === "production",
				expires: accessExp,
			})
			.send({
				message: "Authenticated!!",
				user: request.user,
			});
	}
	return reply.send({ message: "Authenticated!!", user: request.user });
};

const login = async (request, reply) => {
	const { username, password } = request.body;
	const user = await authService.loginByUsername(username, password);
	const { accessToken, accessExp, refreshToken, refreshExp } =
		await authService.prepareToken(user.getPublicInfo());
	return reply
		.cookie("token", accessToken, {
			path: "/",
			signed: true,
			secured: ENV === "production",
			expires: accessExp,
		})
		.cookie("refreshToken", refreshToken, {
			path: "/",
			signed: true,
			secured: ENV === "production",
			expires: refreshExp,
		})
		.send({ message: "Login success" });
};

const register = async (request, reply) => {
	const user = await authService.register(request.body);
	const [{ accessToken, accessExp, refreshToken, refreshExp }] =
		await Promise.all([
			authService.prepareToken(user.getPublicInfo()),
			user.save(),
		]);
	return reply
		.code(httpStatus.ACCEPTED)
		.cookie("token", accessToken, {
			path: "/",
			signed: true,
			secured: ENV === "production",
			expires: accessExp,
		})
		.cookie("refreshToken", refreshToken, {
			path: "/",
			signed: true,
			secured: ENV === "production",
			expires: refreshExp,
		})
		.send({
			message: "Register successful",
			user,
		});
};

const logout = async (request, reply) => {
	const { token, refreshToken } = request.signedCookies;
	await authService.logout(token, refreshToken);
	return reply
		.cookie("token", "", { path: "/" })
		.cookie("refreshToken", "", { path: "/" })
		.send({ message: "Logout success" });
};

module.exports = {
	login,
	register,
	logout,
	auth,
};
