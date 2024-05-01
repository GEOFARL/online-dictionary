"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("favorite_words", {
			userId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "users",
					key: "id",
				},
				onDelete: "CASCADE",
				onUpdate: "CASCADE",
			},
			wordId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "words",
					key: "id",
				},
				onDelete: "CASCADE",
				onUpdate: "CASCADE",
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
			},
		});

		await queryInterface.addConstraint("favorite_words", {
			fields: ["userId", "wordId"],
			type: "unique",
			name: "unique_favorite_words",
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("favorite_words");
	},
};
