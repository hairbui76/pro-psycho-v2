// const { uploadS3, downloadS3 } = require("#configs/s3");
// const Resource = require("#models/resource.model");
// const httpStatus = require("http-status");

// const uploadResource = async (request, reply) => {
// 	const type = request.body.type.value;
// 	const title = request.body.title.value;
// 	const description = request.body.description.value;
// 	const filename = request.body.file.filename;
// 	const buffer = await request.body.file.toBuffer();
// 	await uploadS3(filename, buffer);
// 	const resource = new Resource({
// 		title,
// 		description,
// 		filename,
// 		type,
// 		uploadedBy: request.user.id,
// 	});
// 	await resource.save();
// 	return reply.code(httpStatus.OK).send({
// 		message: "File uploaded successfully",
// 		data: resource,
// 	});
// };

// const downloadResource = async (request, reply) => {
// 	const fileKey = request.params.fileKey;
// 	const { Body } = await downloadS3(fileKey);
// 	return reply.code(httpStatus.OK).send(Body);
// };

// module.exports = { downloadResource, uploadResource };
