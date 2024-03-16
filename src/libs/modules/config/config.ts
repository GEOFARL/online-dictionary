import { logger } from "~/libs/modules/logger/logger.js";

import { BaseConfig } from "./base-config.module.js";

const config = new BaseConfig(logger);

export { config };
