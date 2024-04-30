import {
	type CreationOptional,
	DataTypes,
	type InferAttributes,
	type InferCreationAttributes,
	Model,
} from "sequelize";

import { DEFAULT_STRING_LENGTH } from "~/libs/constants/constants.js";

import { db } from "../db.js";

/* eslint-disable-next-line no-use-before-define */
class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
	declare createdAt: CreationOptional<Date>;

	declare email: string;

	declare fullName: string;

	declare id: number;

	declare password: string;

	declare updatedAt: CreationOptional<Date>;
}

User.init(
	{
		createdAt: {
			allowNull: false,
			defaultValue: DataTypes.NOW,
			type: DataTypes.DATE,
		},
		email: {
			allowNull: false,
			type: DataTypes.STRING(DEFAULT_STRING_LENGTH),
			unique: true,
		},
		fullName: {
			allowNull: false,
			type: DataTypes.STRING(DEFAULT_STRING_LENGTH),
		},
		id: {
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		password: {
			allowNull: false,
			type: DataTypes.STRING(DEFAULT_STRING_LENGTH + DEFAULT_STRING_LENGTH),
		},
		updatedAt: {
			allowNull: false,
			defaultValue: DataTypes.NOW,
			type: DataTypes.DATE,
		},
	},
	{
		modelName: "User",
		sequelize: db,
		tableName: "users",
	},
);

export { User };
