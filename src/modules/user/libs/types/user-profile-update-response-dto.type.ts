import { type UserDto } from "./user-dto.type.js";

type UserProfileUpdateResponseDto = Omit<UserDto, "email" | "password">;

export { type UserProfileUpdateResponseDto };
