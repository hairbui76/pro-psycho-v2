const dotenv = require("dotenv");
const path = require("path");
const { createSecretKey } = require("crypto");

dotenv.config({ path: path.join(__dirname, "../../.env") });

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
		methods: ["GET", "POST", "PATCH", "DELETE"],
		origin: ["localhost:3000", "http://localhost:3000"],
		credentials: true,
		optionsSuccessStatus: 200,
	},
	TOKEN: {
		SECRET: createSecretKey(process.env.TOKEN_SECRET),
		TOKEN_EXPIRE: process.env.TOKEN_EXPIRE_HOURS,
		RESET_TOKEN_EXPIRE: process.env.TOKEN_VERIFY_EXPIRE_MINUTES * 60 * 1000,
		REFRESH_TOKEN_EXPIRE:
			process.env.REFRESH_TOKEN_EXPIRE_WEEKS * 7 * 24 * 60 * 60 * 1000,
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
