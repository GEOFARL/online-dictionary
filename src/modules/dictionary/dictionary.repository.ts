import { type DB } from "~/libs/modules/db/db.js";

class DictionaryRepository {
	private db: DB;

	public constructor({ db }: { db: DB }) {
		this.db = db;
	}

	public addWord({ userId, word }: { userId: string; word: string }) {
		return this.db.WORD.insert({
			userId,
			word,
		});
	}

	public async getAllWordsByUser(userId: string): Promise<
		{
			userId: string;
			word: string;
		}[]
	> {
		const allWords = await this.db.WORD.getAll<{
			userId: string;
			word: string;
		}>();
		return allWords.filter(({ userId: id }) => id === userId);
	}
}

export { DictionaryRepository };
