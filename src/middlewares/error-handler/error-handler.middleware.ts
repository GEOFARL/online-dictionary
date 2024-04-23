import { FIRST_ARRAY_ELEMENT } from "~/libs/constants/constants.js";
import {
	ApplicationError,
	type ErrorDto,
} from "~/libs/exceptions/exceptions.js";
import { HTTPCode, HTTPError } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type Application, type Middleware } from "~/libs/types/types.js";

class ErrorHandlerMiddleware implements Middleware {
	private logger: Logger;

	public constructor({ logger }: { logger: Logger }) {
		this.logger = logger;
	}

	init(app: Application): void {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		app.use((err, _, res, __) => {
			if ("issues" in err) {
				this.logger.error(`[Validation Error]: ${err.message}`);

				err.issues.forEach((issue) => {
					this.logger.error(`[${issue.path.toString()}] — ${issue.message}`);
				});

				res.status(HTTPCode.UNPROCESSED_ENTITY).json({
					message: err.issues
						.map(
							(issue) =>
								`"${issue?.path[FIRST_ARRAY_ELEMENT]}" ${issue.message}`,
						)
						.join("\n"),
					status: HTTPCode.UNPROCESSED_ENTITY,
				} as ErrorDto);

				return;
			}

			if (err instanceof HTTPError) {
				this.logger.error(`[HTTP Error]: ${err.status} - ${err.message}`);

				res.status(err.status).json({
					message: err.message,
					status: err.status,
				} as ErrorDto);

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
