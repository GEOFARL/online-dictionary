import { config } from "../config/config.js";
import { BaseJsonWebToken } from "./base-jsonwebtoken.module.js";

const jsonWebToken = new BaseJsonWebToken({
	secret: config.ENV.JWT.SECRET,
});

export { jsonWebToken };
export { type JsonWebToken } from "./libs/types/types.js";
