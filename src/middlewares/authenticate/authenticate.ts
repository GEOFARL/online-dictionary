import { config } from "~/libs/modules/config/config.js";

import { AuthenticateMiddleware } from "./authenticate.middleware.js";

const authenticateMiddleware = new AuthenticateMiddleware({
	secret: config.ENV.JWT.SECRET,
});

const requiresAuthMiddleware = authenticateMiddleware.requiresAuth();

export { authenticateMiddleware, requiresAuthMiddleware };
