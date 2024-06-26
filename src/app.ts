import { serverApplication } from "~/libs/modules/server-application/server-application.js";
import { authController } from "~/modules/auth/auth.js";
import { dictionaryController } from "~/modules/dictionary/dictionary.js";
import { exploreController } from "~/modules/explore/explore.js";
import { favoritesController } from "~/modules/favorites/favorites.js";
import { homeController } from "~/modules/home/home.js";
import { settingsController } from "~/modules/settings/settings.js";
import { userController } from "~/modules/user/user.js";

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
	userController,
	homeController,
	dictionaryController,
	exploreController,
	settingsController,
	favoritesController,
]);
serverApplication.initErrorHandler(errorHandlerMiddleware);
serverApplication.initSwaggerDocs();
serverApplication.initCrons();
serverApplication.initNotFoundHandler();
await serverApplication.initDB();
serverApplication.start();
