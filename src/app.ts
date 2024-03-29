import { serverApplication } from "~/libs/modules/server-application/server-application.js";
import { authController } from "~/modules/auth/auth.js";
import { dictionaryController } from "~/modules/dictionary/dictionary.js";
import { homeController } from "~/modules/home/home.js";

import {
	authenticateMiddleware,
	errorHandlerMiddleware,
	httpLoggerMiddleware,
	injectDataMiddleware,
	validateMiddleware,
} from "./middlewares/middlewares.js";

serverApplication.initMiddlewares([
	injectDataMiddleware,
	httpLoggerMiddleware,
	authenticateMiddleware,
	validateMiddleware,
]);
serverApplication.initControllers([
	authController,
	homeController,
	dictionaryController,
]);
serverApplication.initErrorHandler(errorHandlerMiddleware);
serverApplication.initSwaggerDocs();
serverApplication.start();
