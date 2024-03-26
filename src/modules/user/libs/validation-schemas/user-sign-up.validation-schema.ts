import { z } from "zod";

import { UserValidationMessage, UserValidationRule } from "../enums/enums.js";

const userSignUp = z.object({
	email: z
		.string()
		.trim()
		.min(UserValidationRule.FIELD_MINIMUM_LENGTH, {
			message: UserValidationMessage.FIELD_REQUIRED,
		})
		.email({
			message: UserValidationMessage.INVALID_EMAIL,
		}),
	fullName: z
		.string()
		.trim()
		.min(UserValidationRule.FIELD_MINIMUM_LENGTH, {
			message: UserValidationMessage.FIELD_REQUIRED,
		})
		.min(UserValidationRule.FULL_NAME_MINIMUM_LENGTH, {
			message: UserValidationMessage.PASSWORD_MINIMUM_LENGTH,
		})
		.max(UserValidationRule.FULL_NAME_MAXIMUM_LENGTH, {
			message: UserValidationMessage.PASSWORD_MAXIMUM_LENGTH,
		}),
	password: z
		.string()
		.trim()
		.min(UserValidationRule.FIELD_MINIMUM_LENGTH, {
			message: UserValidationMessage.FIELD_REQUIRED,
		})
		.min(UserValidationRule.PASSWORD_MINIMUM_LENGTH, {
			message: UserValidationMessage.PASSWORD_MINIMUM_LENGTH,
		})
		.max(UserValidationRule.PASSWORD_MAXIMUM_LENGTH, {
			message: UserValidationMessage.PASSWORD_MAXIMUM_LENGTH,
		}),
});

export { userSignUp };
