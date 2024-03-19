import { type UserDto } from "./user-dto.type.js";

type UserAuthSignUpRequestDto = Omit<UserDto, "createdAt" | "id">;

export { type UserAuthSignUpRequestDto };
