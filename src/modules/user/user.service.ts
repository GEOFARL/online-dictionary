import { type User } from "~/libs/modules/db/models/models.js";
import { HTTPCode, HTTPError } from "~/libs/modules/http/http.js";

import { ExceptionMessage as UserExceptionMessage } from "./libs/enums/enums.js";
import {
	type UserAuthSignUpRequestDto,
	type UserDto,
	type UserProfileUpdateRequestDto,
} from "./libs/types/types.js";
import { type UserRepository } from "./user.repository.js";

class UserService {
	private userRepository: UserRepository;

	public constructor({ userRepository }: { userRepository: UserRepository }) {
		this.userRepository = userRepository;
	}

	public async create(user: UserAuthSignUpRequestDto): Promise<UserDto> {
		return await this.userRepository.create(user);
	}

	public delete(userId: number) {
		return this.userRepository.delete(userId);
	}

	public async findByEmail(email: string): Promise<UserDto> {
		return await this.userRepository.findByEmail(email);
	}

	public async findById(id: number): Promise<UserDto> {
		const user = await this.userRepository.findById(id);

		if (!user) {
			throw new HTTPError({
				message: UserExceptionMessage.USER_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return user;
	}

	public async findByIdSequelizeObject(id: number): Promise<User> {
		const user = await this.userRepository.findByIdSequelizeObject(id);

		if (!user) {
			throw new HTTPError({
				message: UserExceptionMessage.USER_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return user;
	}

	public async update(userId: number, newData: UserProfileUpdateRequestDto) {
		return await this.userRepository.update(userId, newData);
	}
}

export { UserService };
