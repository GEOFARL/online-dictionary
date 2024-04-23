import { type DB } from "~/libs/modules/db/db.js";

import {
	type UserAuthSignUpRequestDto,
	type UserDto,
} from "../user/libs/types/types.js";

class AuthRepository {
	private db: DB;

	public constructor({ db }: { db: DB }) {
		this.db = db;
	}

	public async create(user: UserAuthSignUpRequestDto): Promise<UserDto> {
		const createdUser = await this.db.USER.insert({
			email: user.email,
			full_name: user.fullName,
			password: user.password,
		});

		return {
			createdAt: createdUser.created_at,
			email: createdUser.email,
			fullName: createdUser.full_name,
			id: createdUser.id,
			password: createdUser.password,
			updatedAt: createdUser.updated_at,
		};
	}

	public async findAll(): Promise<UserDto[]> {
		const allUsers = await this.db.USER.getAll<{
			email: string;
			full_name: string;
			password: string;
		}>();

		return allUsers.map((user) => ({
			createdAt: user.created_at,
			email: user.email,
			fullName: user.full_name,
			id: user.id,
			password: user.password,
			updatedAt: user.updated_at,
		}));
	}

	public async findByEmail(email: string): Promise<UserDto | undefined> {
		const allUsers = await this.findAll();

		const user = allUsers.find((userObject) => userObject.email === email);

		return user;
	}

	public async findById(id: string): Promise<UserDto | undefined> {
		const allUsers = await this.findAll();

		const user = allUsers.find((userObject) => userObject.id === +id);

		return user;
	}
}

export { AuthRepository };
