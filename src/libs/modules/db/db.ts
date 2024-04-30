import { Sequelize } from "sequelize";

import { AppEnvironment } from "~/libs/enums/enums.js";

import { config } from "../config/config.js";
import { logger } from "../logger/logger.js";

const db = new Sequelize({
	database: config.ENV.DB.NAME,
	dialect: "postgres",
	host: config.ENV.DB.HOST,
	logging: (query) => {
		if (config.ENV.APP.ENVIRONMENT !== AppEnvironment.PRODUCTION) {
			logger.info(query);
		}
	},
	password: config.ENV.DB.PASSWORD,
	port: config.ENV.DB.PORT,
	username: config.ENV.DB.USER,
});

const connectDB = async () => {
	try {
		await db.authenticate();
		logger.info("DB is connected.");
	} catch (error) {
		logger.info("Error during DB connection.");
	}
};

export { connectDB, db };
