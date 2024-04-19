import { type DB, type DBRecord } from "~/libs/modules/db/db.js";

import { type WordRecordDto } from "./libs/types/types.js";

class DictionaryRepository {
	private db: DB;

	public constructor({ db }: { db: DB }) {
		this.db = db;
	}

	public addWord({ userId, word }: WordRecordDto) {
		return this.db.WORD.insert({
			user_id: userId,
			word,
		});
	}

	public async getAllWordsByUser(
		userId: string,
	): Promise<DBRecord<WordRecordDto>[]> {
		const allWordRecords = await this.db.WORD.getAll<{
			user_id: number;
			word: string;
		}>();

		const allWords = allWordRecords.map((wordRecord) => ({
			created_at: wordRecord.created_at,
			id: wordRecord.id,
			updated_at: wordRecord.updated_at,
			userId: wordRecord.user_id,
			word: wordRecord.word,
		}));

		return allWords.filter(({ userId: id }) => id === +userId);
	}
}

export { DictionaryRepository };
