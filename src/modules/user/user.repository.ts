import { User } from "~/libs/modules/db/models/models.js";

import {
	type UserAuthSignUpRequestDto,
	type UserDto,
	type UserProfileUpdateRequestDto,
	type UserProfileUpdateResponseDto,
} from "./libs/types/types.js";

class UserRepository {
	public async create(user: UserAuthSignUpRequestDto): Promise<UserDto> {
		const createdUser = await User.create({
			email: user.email,
			fullName: user.fullName,
			password: user.password,
		});

		return {
			createdAt: createdUser.createdAt.toISOString(),
			email: createdUser.email,
			fullName: createdUser.fullName,
			id: createdUser.id,
			password: createdUser.password,
			updatedAt: createdUser.updatedAt.toISOString(),
		};
	}

	public async delete(userId: number): Promise<boolean> {
		const count = await User.destroy({
			where: { id: userId },
		});

		return Boolean(count);
	}

	public async findAll(): Promise<UserDto[]> {
		const allUsers = await User.findAll();

		return allUsers.map((user) => ({
			createdAt: user.createdAt.toISOString(),
			email: user.email,
			fullName: user.fullName,
			id: user.id,
			password: user.password,
			updatedAt: user.updatedAt.toISOString(),
		}));
	}

	public async findByEmail(email: string): Promise<UserDto | null> {
		const user = await User.findOne({ where: { email } });

		if (user) {
			return {
				createdAt: user.createdAt.toISOString(),
				email: user.email,
				fullName: user.fullName,
				id: user.id,
				password: user.password,
				updatedAt: user.updatedAt.toISOString(),
			};
		}

		return null;
	}

	public async findById(id: number): Promise<UserDto | null> {
		const user = await User.findByPk(id);

		if (user) {
			return {
				createdAt: user.createdAt.toISOString(),
				email: user.email,
				fullName: user.fullName,
				id: user.id,
				password: user.password,
				updatedAt: user.updatedAt.toISOString(),
			};
		}

		return null;
	}

	public async update(
		userId: number,
		user: UserProfileUpdateRequestDto,
	): Promise<UserProfileUpdateResponseDto | null> {
		const [rowsAffected] = await User.update(
			{
				fullName: user.fullName,
			},
			{
				returning: true,
				where: { id: userId },
			},
		);

		return rowsAffected ? await this.findById(userId) : null;
	}
}

export { UserRepository };
