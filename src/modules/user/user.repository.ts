import { Op } from "sequelize";

import { db } from "~/libs/modules/db/db.js";
import { User, Word } from "~/libs/modules/db/models/models.js";

import {
	type UserAuthSignUpRequestDto,
	type UserDto,
	type UserProfileUpdateRequestDto,
	type UserProfileUpdateResponseDto,
} from "./libs/types/types.js";

class UserRepository {
	public async create(user: UserAuthSignUpRequestDto): Promise<UserDto> {
		const result = await db.transaction(async (transaction) => {
			const createdUser = await User.create(
				{
					email: user.email,
					fullName: user.fullName,
					password: user.password,
				},
				{ transaction },
			);

			return {
				createdAt: createdUser.createdAt.toISOString(),
				email: createdUser.email,
				fullName: createdUser.fullName,
				id: createdUser.id,
				password: createdUser.password,
				updatedAt: createdUser.updatedAt.toISOString(),
			};
		});

		return result;
	}

	public delete(userId: number): Promise<boolean> {
		return db.transaction(async (transaction) => {
			const count = await User.destroy({
				transaction,
				where: { id: userId },
			});

			return Boolean(count);
		});
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

	public async findByIdSequelizeObject(id: number): Promise<User | null> {
		const user = await User.findByPk(id);

		if (user) {
			return user;
		}

		return null;
	}

	public async findFavorites({
		partsOfSpeechFilters,
		userId,
	}: {
		partsOfSpeechFilters: string[];
		userId: number;
	}): Promise<Word[]> {
		const NO_CONDITIONS = 0;

		const conditions = partsOfSpeechFilters.map((ps) => ({
			partOfSpeech: {
				[Op.like]: `%${ps}%`,
			},
		}));

		return (
			(
				(await User.findByPk(userId, {
					include: [
						{
							as: "favorites",
							model: Word,
							where:
								conditions.length > NO_CONDITIONS
									? { [Op.or]: conditions }
									: {},
						},
					],
					order: [[{ as: "favorites", model: Word }, "createdAt", "DESC"]],
				})) as unknown as { favorites?: Word[] }
			)?.favorites ?? []
		);
	}

	public async update(
		userId: number,
		user: UserProfileUpdateRequestDto,
	): Promise<UserProfileUpdateResponseDto | null> {
		const result = await db.transaction(async (transaction) => {
			const [rowsAffected, [updatedUser]] = await User.update(
				{ fullName: user.fullName },
				{
					returning: true,
					transaction,
					where: { id: userId },
				},
			);

			return rowsAffected ? updatedUser : null;
		});

		if (result) {
			return {
				createdAt: result.createdAt.toISOString(),
				fullName: result.fullName,
				id: result.id,
				updatedAt: result.updatedAt.toISOString(),
			};
		}

		return null;
	}
}

export { UserRepository };
