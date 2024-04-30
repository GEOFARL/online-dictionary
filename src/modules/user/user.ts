import { UserController } from "./user.controller.js";
import { UserRepository } from "./user.repository.js";
import { UserService } from "./user.service.js";

const userRepository = new UserRepository();

const userService = new UserService({
	userRepository,
});

const userController = new UserController({
	userService,
});

export { ExceptionMessage } from "./libs/enums/enums.js";
export {
	type UserAuthResponseDto,
	type UserAuthSignInRequestDto,
	type UserAuthSignUpRequestDto,
	type UserDto,
} from "./libs/types/types.js";
export {
	userSignIn as userSignInValidationSchema,
	userSignUp as userSignUpValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";
export { userController, userService };
export { type UserService } from "./user.service.js";
