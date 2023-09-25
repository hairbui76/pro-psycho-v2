const cloudinary = require("#configs/cloudinary")();

const uploadCloudinary = async (img) => {
	const mimetype = img.mimetype;
	const base64 = (await img.toBuffer()).toString("base64");
	return cloudinary.uploader.upload(`data:${mimetype};base64,${base64}`, {
		folder: `resources/imgs`,
		resource_type: "auto",
	});
};

module.exports = {
	uploadCloudinary,
};
