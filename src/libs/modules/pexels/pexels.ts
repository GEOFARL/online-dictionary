import { config } from "../config/config.js";
import { BasePexels } from "./base-pexels.module.js";

const pexels = new BasePexels({
	apiKey: config.ENV.PEXELS.API_KEY,
});

export { pexels };
