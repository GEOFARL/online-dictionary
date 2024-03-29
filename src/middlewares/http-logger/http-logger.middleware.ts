import { type NextFunction, type Request, type Response } from "express";

import { type Logger } from "~/libs/modules/logger/logger.js";
import { type Application, type Middleware } from "~/libs/types/types.js";

class HTTPLoggerMiddleware implements Middleware {
	private logger: Logger;

	public constructor({ logger }: { logger: Logger }) {
		this.logger = logger;
	}

	public init(app: Application): void {
		app.use((req: Request, _: Response, next: NextFunction) => {
			this.logger.info(`[${req.method}] on ${req.url}`);
			next();
		});
	}

	public get name() {
		return "http-logger";
	}
}

export { HTTPLoggerMiddleware };
