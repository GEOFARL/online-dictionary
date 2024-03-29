import { logger } from "~/libs/modules/logger/logger.js";

import { HTTPLoggerMiddleware } from "./http-logger.middleware.js";

const httpLoggerMiddleware = new HTTPLoggerMiddleware({
	logger,
});

export { httpLoggerMiddleware };
