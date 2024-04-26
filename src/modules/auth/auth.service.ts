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
	type UserService,
} from "../user/user.js";

class AuthService {
	private jsonWebToken: JsonWebToken;

	private userService: UserService;

	public constructor({
		jsonWebToken,
		userService,
	}: {
		jsonWebToken: JsonWebToken;
		userService: UserService;
	}) {
		this.userService = userService;
		this.jsonWebToken = jsonWebToken;
	}

	public findByToken(token: string): Promise<UserDto> {
		const id = this.jsonWebToken.decode(token);
		return this.userService.findById(+id);
	}

	public async logIn(
		user: UserAuthSignInRequestDto,
	): Promise<UserAuthResponseDto> {
		const loggedInUser = await this.userService.findByEmail(user.email);

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

	public async signUp(
		user: UserAuthSignUpRequestDto,
	): Promise<UserAuthResponseDto> {
		const existingUser = await this.userService.findByEmail(user.email);
		if (existingUser) {
			throw new HTTPError({
				message: ExceptionMessage.EMAIL_IS_TAKEN,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		const { hash } = await encrypt.encrypt(user.password);
		const userWithHash: UserAuthSignUpRequestDto = { ...user, password: hash };

		const createdUser = await this.userService.create(userWithHash);

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
}

export { AuthService };
