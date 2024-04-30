import dotenv from "dotenv";
dotenv.config();

export default {
	development: {
		database: process.env.DB_NAME,
		dialect: "postgres",
		host: process.env.DB_HOST,
		password: process.env.DB_PASSWORD,
		port: process.env.DB_PORT,
		username: process.env.DB_USER,
	},
};
