import { authService } from "~/modules/auth/auth.js";

import { InjectDataMiddleware } from "./inject-data.middleware.js";

const injectDataMiddleware = new InjectDataMiddleware({
	authService,
});

export { injectDataMiddleware };
