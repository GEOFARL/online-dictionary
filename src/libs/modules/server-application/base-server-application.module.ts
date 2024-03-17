import express from "express";

import { type Application, type Controller } from "~/libs/types/types.js";

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

		this.initMiddlewares();
	}

	private initMiddlewares() {
		this.app.use(express.json());
		this.app.use(express.static("public"));

		this.views.init(this.app);
	}

	public initControllers(controllers: Controller[]) {
		controllers.forEach((controller) => {
			controller.init(this.app);
		});
	}

	public start() {
		this.app.listen(this.config.ENV.APP.PORT, this.config.ENV.APP.HOST, () => {
			this.logger.info(
				`The server is started on ${this.config.ENV.APP.HOST}${this.config.ENV.APP.PORT}`,
			);
		});
	}
}

export { BaseServerApplication };
