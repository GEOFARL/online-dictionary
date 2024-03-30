import cookieParser from "cookie-parser";
import express from "express";
import path from "path";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import { AppEnvironment, Cookie } from "~/libs/enums/enums.js";
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
	title: string;
	views: Views;
};

class BaseServerApplication {
	private app: Application;

	private config: Config;

	private logger: Logger;

	private title: string;

	private views: Views;

	public constructor({ config, logger, title, views }: Constructor) {
		this.app = express();
		this.config = config;
		this.logger = logger;
		this.views = views;
		this.title = title;
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

	public initNotFoundHandler() {
		const NOT_FOUND_STATUS = 404;
		this.app.use((req, res) => {
			res
				.status(NOT_FOUND_STATUS)
				.render(
					path.join(path.resolve(), "src", "views", "pages", "not-found.ejs"),
				);
		});
		this.logger.info("Not Found handler is initialized");
	}

	public initSwaggerDocs() {
		const isLocal = this.config.ENV.APP.ENVIRONMENT === AppEnvironment.LOCAL;

		const controllerExtension = isLocal ? "ts" : "js";

		const options = swaggerJsdoc({
			apis: [`src/modules/**/*.controller.${controllerExtension}`],
			definition: {
				components: {
					securitySchemes: {
						cookieAuth: {
							in: "cookie",
							name: Cookie.TOKEN,
							type: "apiKey",
						},
					},
				},
				info: {
					title: this.title,
					version: `1.0.0`,
				},
				openapi: "3.0.0",
				servers: [{ url: "/" }],
			},
		});

		this.app.use("/documentation", swaggerUi.serve, swaggerUi.setup(options));
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
