import { ExceptionMessage } from "~/libs/exceptions/exceptions.js";
import { encrypt } from "~/libs/modules/encrypt/encrypt.js";
import { HTTPCode, HTTPError } from "~/libs/modules/http/http.js";
import { type JsonWebToken } from "~/libs/modules/jsonwebtoken/jsonwebtoken.js";

import {
	type UserAuthResponseDto,
	type UserAuthSignInRequestDto,
	type UserAuthSignUpRequestDto,
	type UserDto,
	ExceptionMessage as UserExceptionMessage,
} from "../user/user.js";
import { type AuthRepository } from "./auth.repository.js";

class AuthService {
	private authRepository: AuthRepository;

	private jsonWebToken: JsonWebToken;

	public constructor({
		authRepository,
		jsonWebToken,
	}: {
		authRepository: AuthRepository;
		jsonWebToken: JsonWebToken;
	}) {
		this.authRepository = authRepository;
		this.jsonWebToken = jsonWebToken;
	}

	public async createUser(
		user: UserAuthSignUpRequestDto,
	): Promise<UserAuthResponseDto> {
		const existingUser = await this.authRepository.findByEmail(user.email);
		if (existingUser) {
			throw new HTTPError({
				message: ExceptionMessage.EMAIL_IS_TAKEN,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		const { hash } = await encrypt.encrypt(user.password);
		const userWithHash: UserAuthSignUpRequestDto = { ...user, password: hash };

		const createdUser = await this.authRepository.create(userWithHash);

		if (!createdUser) {
			throw new HTTPError({
				message: ExceptionMessage.SOMETHING_WENT_WRONG,
				status: HTTPCode.INTERNAL_SERVER_ERROR,
			});
		}

		const token = this.jsonWebToken.sign(String(createdUser.id));

		return {
			token,
			user: createdUser,
		};
	}

	public findByToken(token: string): Promise<UserDto> {
		const id = this.jsonWebToken.decode(token);
		return this.findUserById(id);
	}

	public async findUserById(id: string): Promise<UserDto> {
		const user = await this.authRepository.findById(id);

		if (!user) {
			throw new HTTPError({
				message: UserExceptionMessage.USER_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return user;
	}

	public async logInUser(
		user: UserAuthSignInRequestDto,
	): Promise<UserAuthResponseDto> {
		const loggedInUser = await this.authRepository.findByEmail(user.email);

		if (!loggedInUser) {
			throw new HTTPError({
				message: UserExceptionMessage.USER_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const hasMatchingPassword = await encrypt.compare({
			password: user.password,
			passwordHash: loggedInUser.password,
		});

		if (!hasMatchingPassword) {
			throw new HTTPError({
				message: UserExceptionMessage.INCORRECT_CREDENTIALS,
				status: HTTPCode.UNAUTHORIZED,
			});
		}

		const token = this.jsonWebToken.sign(String(loggedInUser.id));

		return {
			token,
			user: loggedInUser,
		};
	}
}

export { AuthService };
