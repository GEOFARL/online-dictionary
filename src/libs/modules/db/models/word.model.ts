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
class Word extends Model<InferAttributes<Word>, InferCreationAttributes<Word>> {
	declare createdAt: CreationOptional<Date>;

	declare id: number;

	declare isWordOfTheDay: boolean;

	declare partOfSpeech: string;

	declare updatedAt: CreationOptional<Date>;

	declare word: string;
}

Word.init(
	{
		createdAt: {
			allowNull: false,
			defaultValue: DataTypes.NOW,
			type: DataTypes.DATE,
		},
		id: {
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		isWordOfTheDay: {
			defaultValue: "0",
			type: DataTypes.BOOLEAN,
		},
		partOfSpeech: {
			type: DataTypes.STRING,
		},
		updatedAt: {
			allowNull: false,
			defaultValue: DataTypes.NOW,
			type: DataTypes.DATE,
		},
		word: {
			allowNull: false,
			type: DataTypes.STRING(DEFAULT_STRING_LENGTH),
		},
	},
	{
		modelName: "Word",
		sequelize: db,
		tableName: "words",
	},
);

export { Word };
