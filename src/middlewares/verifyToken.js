const { decode } = require("#configs/paseto");
const { TOKEN } = require("#configs/config");
const { ApiError } = require("#utils");
const { DateTime } = require("luxon");
const httpStatus = require("http-status");

const verifyToken = async (request, _reply) => {
	// try {
	// if (!request.cookies)
	// 	throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized");
	const accessToken = request.cookies.access_token;
	if (!accessToken) throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized");
	const accessTokenUnsigned = request.unsignCookie(accessToken);
	if (!accessTokenUnsigned.valid)
		throw new ApiError(httpStatus.NOT_ACCEPTABLE, "Access token is not valid");
	const user = await decode(accessTokenUnsigned.value, TOKEN.SECRET);
	if (!user) throw new ApiError(httpStatus.UNAUTHORIZED, "User not found");
	if (DateTime.fromISO(user.exp) < DateTime.local())
		throw new ApiError(httpStatus.UNAUTHORIZED, "Access token expired");
	request.user = user;
	// } catch (error) {
	// 	done(error);
	// }
};

module.exports = verifyToken;
