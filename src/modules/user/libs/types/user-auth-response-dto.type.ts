import { type UserDto } from "./user-dto.type.js";

type UserAuthResponseDto = {
	token: string;
	user: UserDto;
};

export { type UserAuthResponseDto };
