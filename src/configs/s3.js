const {
	S3,
	GetObjectCommand,
	PutObjectCommand,
} = require("@aws-sdk/client-s3");
const { AWS } = require("./config");

const s3 = new S3({
	region: AWS.REGION,
	accessKeyId: AWS.ACCESS_KEY_ID,
	secretAccessKey: AWS.SECRET_ACCESS_KEY,
});

const uploadS3 = (filename, buffer) => {
	const command = new PutObjectCommand({
		Bucket: "pro-psycho-bucket",
		Key: filename,
		Body: buffer,
	});
	return s3.send(command);
};

const downloadS3 = async (fileKey) => {
	const command = new GetObjectCommand({
		Bucket: "pro-psycho-bucket",
		Key: fileKey,
	});
	return s3.send(command);
};

module.exports = {
	uploadS3,
	downloadS3,
};
