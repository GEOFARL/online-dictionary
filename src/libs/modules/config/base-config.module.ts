import convict, { type Config as LibraryConfig } from "convict";
import { config } from "dotenv";

import { AppEnvironment } from "~/libs/enums/enums.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { type Config, type EnvironmentSchema } from "./libs/types/types.js";

class BaseConfig implements Config {
	private logger: Logger;

	public ENV: EnvironmentSchema;

	public constructor(logger: Logger) {
		this.logger = logger;

		config();

		this.envSchema.load({});
		this.envSchema.validate({
			allowed: "strict",
			output: (message) => {
				this.logger.info(message);
			},
		});

		this.ENV = this.envSchema.getProperties();
		this.logger.info(".env file found and successfully parsed!");
	}

	private get envSchema(): LibraryConfig<EnvironmentSchema> {
		return convict<EnvironmentSchema>({
			APP: {
				ENVIRONMENT: {
					default: null,
					doc: "Application environment",
					env: "NODE_ENV",
					format: Object.values(AppEnvironment),
				},
				HOST: {
					default: null,
					doc: "Host for server app",
					env: "HOST",
					format: String,
				},
				PORT: {
					default: null,
					doc: "Port for incoming connections",
					env: "PORT",
					format: Number,
				},
			},
			DB: {
				HOST: {
					default: null,
					doc: "Location where your database is hosted",
					env: "DB_HOST",
					format: String,
				},
				NAME: {
					default: null,
					doc: "Database name",
					env: "DB_NAME",
					format: String,
				},
				PASSWORD: {
					default: null,
					doc: "Database password",
					env: "DB_PASSWORD",
					format: String,
				},
				PORT: {
					default: null,
					doc: "Database port number",
					env: "DB_PORT",
					format: Number,
				},
				USER: {
					default: null,
					doc: "Database user",
					env: "DB_USER",
					format: String,
				},
			},
			JWT: {
				SECRET: {
					default: null,
					doc: "JWT secret string",
					env: "JWT_SECRET",
					format: String,
				},
			},
			PEXELS: {
				API_KEY: {
					default: null,
					doc: "An API key for the Pexels images",
					env: "PEXELS_API_KEY",
					format: String,
				},
			},
		});
	}
}

export { BaseConfig };
