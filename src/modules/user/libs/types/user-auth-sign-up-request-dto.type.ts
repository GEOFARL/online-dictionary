import { type UserDto } from "./user-dto.type";

type UserAuthSignUpRequestDto = Omit<UserDto, "createdAt" | "id">;

export { type UserAuthSignUpRequestDto };
