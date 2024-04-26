import { jsonWebToken } from "~/libs/modules/jsonwebtoken/jsonwebtoken.js";

import { userService } from "../user/user.js";
import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";

const authService = new AuthService({
	jsonWebToken,
	userService,
});

const authController = new AuthController({
	authService,
});

export { type AuthService } from "./auth.service.js";
export { authController, authService };
