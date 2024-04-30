module.exports = {
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("word_views");
		await queryInterface.dropTable("words");
		await queryInterface.dropTable("users");
	},

	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("users", {
			email: {
				allowNull: false,
				type: Sequelize.STRING(100),
				unique: true,
			},
			fullName: {
				allowNull: false,
				type: Sequelize.STRING(100),
			},
			id: {
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			password: {
				allowNull: false,
				type: Sequelize.STRING(200),
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

		await queryInterface.createTable("words", {
			id: {
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			word: {
				allowNull: false,
				type: Sequelize.STRING(100),
			},
			partOfSpeech: {
				type: Sequelize.STRING(50),
			},
			isWordOfTheDay: {
				type: Sequelize.BOOLEAN,
				defaultValue: "0",
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

		await queryInterface.createTable("word_views", {
			id: {
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			userId: {
				type: Sequelize.INTEGER,
				references: { model: "users", key: "id" },
				allowNull: false,
				onDelete: "CASCADE",
			},
			wordId: {
				type: Sequelize.INTEGER,
				references: { model: "words", key: "id" },
				allowNull: false,
			},
			count: {
				type: Sequelize.INTEGER,
				defaultValue: 1,
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
	},
};
