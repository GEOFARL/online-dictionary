import { z } from "zod";

import { UserValidationMessage, UserValidationRule } from "../enums/enums.js";

const userProfileUpdate = z.object({
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
});

export { userProfileUpdate };
