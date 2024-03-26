import { UserValidationRule } from "./user-validation-rule.enum.js";

const UserValidationMessage = {
	FIELD_REQUIRED: "Це поле є обовʼязковим",
	FULL_NAME_MAXIMUM_LENGTH: `Максимальна довжина – ${UserValidationRule.FULL_NAME_MAXIMUM_LENGTH} символів`,
	FULL_NAME_MINIMUM_LENGTH: `Мінімальна довжина – ${UserValidationRule.FULL_NAME_MINIMUM_LENGTH} символів`,
	INVALID_EMAIL: "Невалідний email",
	PASSWORD_MAXIMUM_LENGTH: `Максимальна довжина – ${UserValidationRule.PASSWORD_MAXIMUM_LENGTH} символів`,
	PASSWORD_MINIMUM_LENGTH: `Мінімальна довжина – ${UserValidationRule.PASSWORD_MINIMUM_LENGTH} символів`,
} as const;

export { UserValidationMessage };
