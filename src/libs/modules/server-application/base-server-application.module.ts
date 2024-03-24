import cookieParser from "cookie-parser";
import express from "express";
import path from "path";

import {
	type Application,
	type Controller,
	type Middleware,
} from "~/libs/types/types.js";

import { type Config } from "../config/libs/types/types.js";
import { type Logger } from "../logger/logger.js";
import { type Views } from "../views/views.js";

type Constructor = {
	config: Config;
	logger: Logger;
	views: Views;
};

class BaseServerApplication {
	private app: Application;

	private config: Config;

	private logger: Logger;

	private views: Views;

	public constructor({ config, logger, views }: Constructor) {
		this.app = express();
		this.config = config;
		this.logger = logger;
		this.views = views;
	}

	public initControllers(controllers: Controller[]) {
		controllers.forEach((controller) => {
			controller.init(this.app);
			controller.routes.forEach((route) => {
				this.logger.info(
					`Route ${route.httpMethod} ${route.path} is registered`,
				);
			});
			this.logger.info(`Controller '${controller.name}' is initialized`);
		});
	}

	public initErrorHandler(middleware: Middleware) {
		middleware.init(this.app);
		this.logger.info("Error handler is initialized");
	}

	public initMiddlewares(middlewares: Middleware[]) {
		this.app.use(express.json());
		this.app.use(
			express.static(path.join(path.resolve(), "src", "client", "public")),
		);
		this.app.use(cookieParser());

		this.views.init(this.app);

		middlewares.forEach((middleware) => {
			middleware.init(this.app);
			this.logger.info(`Middleware '${middleware.name}' is initialized`);
		});
	}

	public start() {
		this.app.listen(this.config.ENV.APP.PORT, this.config.ENV.APP.HOST, () => {
			this.logger.info(
				`The server is started on ${this.config.ENV.APP.HOST}:${this.config.ENV.APP.PORT}`,
			);
		});
	}
}

export { BaseServerApplication };
