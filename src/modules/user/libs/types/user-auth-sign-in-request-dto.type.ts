import { type UserAuthSignUpRequestDto } from "./user-auth-sign-up-request-dto.type.js";

type UserAuthSignInRequestDto = Omit<UserAuthSignUpRequestDto, "fullName">;

export { type UserAuthSignInRequestDto };
