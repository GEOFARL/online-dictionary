import { config } from "../config/config.js";
import { logger } from "../logger/logger.js";
import { views } from "../views/views.js";
import { BaseServerApplication } from "./base-server-application.module.js";

const serverApplication = new BaseServerApplication({
	config,
	logger,
	title: "Online Dictionary",
	views,
});

export { serverApplication };
