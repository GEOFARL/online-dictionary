import { db } from "~/libs/modules/db/db.js";
import { jsonWebToken } from "~/libs/modules/jsonwebtoken/jsonwebtoken.js";

import { AuthController } from "./auth.controller.js";
import { AuthRepository } from "./auth.repository.js";
import { AuthService } from "./auth.service.js";

const authRepository = new AuthRepository({
	db,
});

const authService = new AuthService({
	authRepository,
	jsonWebToken,
});

const authController = new AuthController({
	authService,
});

export { authController, authService };
