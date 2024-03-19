import { serverApplication } from "~/libs/modules/server-application/server-application.js";
import { authController } from "~/modules/auth/auth.js";
import { homeController } from "~/modules/home/home.js";

import {
	authenticateMiddleware,
	errorHandlerMiddleware,
} from "./middlewares/middlewares.js";

serverApplication.initMiddlewares([authenticateMiddleware]);
serverApplication.initControllers([authController, homeController]);
serverApplication.initErrorHandler(errorHandlerMiddleware);
serverApplication.start();
