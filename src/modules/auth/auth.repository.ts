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

	public create(user: UserAuthSignUpRequestDto): Promise<UserDto> {
		return this.db.USER.insert(user);
	}

	public findAll(): Promise<UserDto[]> {
		return this.db.USER.getAll<UserDto>();
	}

	public async findByEmail(email: string): Promise<UserDto | undefined> {
		const allUsers = await this.findAll();

		const user = allUsers.find((userObject) => userObject.email === email);

		return user;
	}

	public async findById(id: string): Promise<UserDto | undefined> {
		const allUsers = await this.findAll();

		const user = allUsers.find((userObject) => userObject.id === id);

		return user;
	}
}

export { AuthRepository };
