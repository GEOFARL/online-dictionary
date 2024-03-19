import { config } from "~/libs/modules/config/config.js";
import { jsonWebToken } from "~/libs/modules/jsonwebtoken/jsonwebtoken.js";
import { authService } from "~/modules/auth/auth.js";

import { AuthenticateMiddleware } from "./authenticate.middleware.js";

const authenticateMiddleware = new AuthenticateMiddleware({
	authService,
	jsonWebToken,
	secret: config.ENV.JWT.SECRET,
});

const requiresAuthMiddleware = authenticateMiddleware.requiresAuth();

export { authenticateMiddleware, requiresAuthMiddleware };
