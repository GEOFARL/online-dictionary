import { UserValidationRule } from "./user-validation-rule.enum.js";

const UserValidationMessage = {
	FIELD_REQUIRE: "Це поле є обовʼязковим",
	INVALID_EMAIL: "Невалідний email",
	PASSWORD_MAXIMUM_LENGTH: `Максимальна довжина – ${UserValidationRule.PASSWORD_MAXIMUM_LENGTH} символів`,
	PASSWORD_MINIMUM_LENGTH: `Мінімальна довжина – ${UserValidationRule.PASSWORD_MINIMUM_LENGTH} символів`,
} as const;

export { UserValidationMessage };
