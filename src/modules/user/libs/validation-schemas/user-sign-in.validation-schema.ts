import { z } from "zod";

import { UserValidationMessage, UserValidationRule } from "../enums/enums.js";

const userSignIn = z.object({
	email: z
		.string()
		.trim()
		.min(UserValidationRule.FIELD_MINIMUM_LENGTH, {
			message: UserValidationMessage.FIELD_REQUIRED,
		})
		.email({
			message: UserValidationMessage.INVALID_EMAIL,
		}),
	password: z.string().trim().min(UserValidationRule.FIELD_MINIMUM_LENGTH, {
		message: UserValidationMessage.FIELD_REQUIRED,
	}),
});

export { userSignIn };
