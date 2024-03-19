import { logger } from "~/libs/modules/logger/logger.js";

import { ErrorHandlerMiddleware } from "./error-handler.middleware.js";

const errorHandlerMiddleware = new ErrorHandlerMiddleware({
	logger,
});

export { errorHandlerMiddleware };
