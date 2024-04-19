import { config } from "../config/config.js";
import { logger } from "../logger/logger.js";
import { BaseDB } from "./base-db.module.js";

const db = new BaseDB({
	dbConnection: {
		database: config.ENV.DB.NAME,
		host: config.ENV.DB.HOST,
		password: config.ENV.DB.PASSWORD,
		port: config.ENV.DB.PORT,
		user: config.ENV.DB.USER,
	},
	logger,
});

export { db };
export { type DB, type DBRecord } from "./libs/types/types.js";
