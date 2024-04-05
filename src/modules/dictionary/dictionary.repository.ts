import { type DB, type DBRecord } from "~/libs/modules/db/db.js";

import { type WordRecordDto } from "./libs/types/types.js";

class DictionaryRepository {
	private db: DB;

	public constructor({ db }: { db: DB }) {
		this.db = db;
	}

	public addWord({ userId, word }: WordRecordDto) {
		return this.db.WORD.insert({
			userId,
			word,
		});
	}

	public async getAllWordsByUser(
		userId: string,
	): Promise<DBRecord<WordRecordDto>[]> {
		const allWords = await this.db.WORD.getAll<WordRecordDto>();
		return allWords.filter(({ userId: id }) => id === userId);
	}
}

export { DictionaryRepository };
