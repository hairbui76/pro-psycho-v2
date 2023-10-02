const dotenv = require("dotenv");
const { createSecretKey } = require("crypto");

dotenv.config();

const config = {
	BASE: {
		HOSTNAME: process.env.BASE_URL,
		PORT: process.env.BASE_PORT,
	},
	API_VERSION: "v1",
	DB: {
		URL: process.env.MONGOOSE_URL,
		HOST: process.env.MONGOOSE_HOST,
		PORT: process.env.MONGOOSE_PORT,
		DATABASE: process.env.MONGOOSE_DB_NAME,
	},
	CORS: {
		methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
		origin: ["localhost:3000", "http://localhost:3000"],
		credentials: true,
		optionsSuccessStatus: 200,
	},
	TOKEN: {
		SECRET: createSecretKey(process.env.TOKEN_SECRET),
		TOKEN_EXPIRE_HOURS: process.env.TOKEN_EXPIRE_HOURS,
		REFRESH_TOKEN_EXPIRE_WEEKS: process.env.REFRESH_TOKEN_EXPIRE_WEEKS,
	},
	COOKIE: {
		SECRET: process.env.COOKIE_SECRET,
	},
	ENV: process.env.NODE_ENV || "development",
	AWS: {
		REGION: process.env.AWS_REGION,
		ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
		SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
	},
	S3: {
		BUCKET: process.env.S3_BUCKET,
	},
	CLOUDINARY: {
		CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
		API_KEY: process.env.CLOUDINARY_API_KEY,
		API_SECRET: process.env.CLOUDINARY_API_SECRET,
	},

	get HttpUrl() {
		return `${this.BASE.HOSTNAME}:${this.BASE.PORT}`;
	},

	get DBUri() {
		return (
			this.DB.URL ||
			`mongodb://${this.DB.HOST}:${this.DB.PORT}/${this.DB.DATABASE}`
		);
	},
};

module.exports = config;
