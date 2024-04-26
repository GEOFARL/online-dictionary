import { config } from "~/libs/modules/config/config.js";
import { jsonWebToken } from "~/libs/modules/jsonwebtoken/jsonwebtoken.js";
import { userService } from "~/modules/user/user.js";

import { AuthenticateMiddleware } from "./authenticate.middleware.js";

const authenticateMiddleware = new AuthenticateMiddleware({
	jsonWebToken,
	secret: config.ENV.JWT.SECRET,
	userService,
});

const requiresAuthMiddleware = authenticateMiddleware.requiresAuth();

export { authenticateMiddleware, requiresAuthMiddleware };
