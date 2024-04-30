import { User } from "./user.model.js";
import { Word } from "./word.model.js";
import { WordView } from "./word-view.model.js";

const setupAssociations = () => {
	User.belongsToMany(Word, {
		as: "words",
		foreignKey: "userId",
		otherKey: "wordId",
		through: WordView,
	});

	Word.belongsToMany(User, {
		as: "users",
		foreignKey: "wordId",
		otherKey: "userId",
		through: WordView,
	});
};

export { setupAssociations };
