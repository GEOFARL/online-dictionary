import { type Express } from "express";

import {
	ApplicationError,
	type ErrorDto,
} from "~/libs/exceptions/exceptions.js";
import { HTTPCode, HTTPError } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type Middleware } from "~/libs/types/types.js";

class ErrorHandlerMiddleware implements Middleware {
	private logger: Logger;

	public constructor({ logger }: { logger: Logger }) {
		this.logger = logger;
	}

	init(app: Express): void {
		app.use((err, _, res, next) => {
			if (err instanceof HTTPError) {
				this.logger.error(`[HTTP Error]: ${err.status} - ${err.message}`);

				res.status(err.status).json({
					message: err.message,
					status: err.status,
				} as ErrorDto);

				next();
				return;
			}

			if (err instanceof ApplicationError) {
				this.logger.error(`[Application Error]: ${err.message}`);
			} else {
				this.logger.error(err.message);
			}

			res.status(HTTPCode.INTERNAL_SERVER_ERROR).json({
				message: err.message,
				status: HTTPCode.INTERNAL_SERVER_ERROR,
			} as ErrorDto);
		});
	}

	public get name() {
		return "error handler";
	}
}

export { ErrorHandlerMiddleware };
