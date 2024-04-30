import { type Association, DataTypes, Model } from "sequelize";

import { db } from "../db.js";
import { type Word } from "./word.model.js";

class WordView extends Model {
	static associations: {
		/* eslint-disable-next-line no-use-before-define */
		word: Association<WordView, Word>;
	};

	declare count: number;

	declare createdAt: Date;

	declare id: number;

	declare updatedAt: Date;

	declare userId: number;

	declare word?: Word;

	declare wordId: number;
}

WordView.init(
	{
		count: {
			defaultValue: 1,
			type: DataTypes.INTEGER,
		},
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
		updatedAt: {
			allowNull: false,
			defaultValue: DataTypes.NOW,
			type: DataTypes.DATE,
		},
		userId: {
			allowNull: false,
			references: {
				key: "id",
				model: "users",
			},
			type: DataTypes.INTEGER,
		},
		wordId: {
			allowNull: false,
			references: {
				key: "id",
				model: "words",
			},
			type: DataTypes.INTEGER,
		},
	},
	{
		sequelize: db,
		tableName: "word_views",
	},
);

export { WordView };
