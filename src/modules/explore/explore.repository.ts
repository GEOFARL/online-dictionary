import { LAST_ARRAY_ELEMENT } from "~/libs/constants/constants.js";
import { type DB } from "~/libs/modules/db/db.js";
import { type DBRecord } from "~/libs/modules/db/libs/types/db-record.type.js";

import { type WordOfTheDayDto } from "../dictionary/dictionary.js";

class ExploreRepository {
	private db: DB;

	public constructor({ db }: { db: DB }) {
		this.db = db;
	}

	public async getLastWordOfTheDay(): Promise<DBRecord<WordOfTheDayDto>> {
		const allWordsOfTheDay =
			await this.db.WORD_OF_THE_DAY.getAll<WordOfTheDayDto>();
		return allWordsOfTheDay.at(LAST_ARRAY_ELEMENT);
	}

	public saveWordOfTheDay(wordOfTheDay: WordOfTheDayDto) {
		return this.db.WORD_OF_THE_DAY.insert(wordOfTheDay);
	}
}

export { ExploreRepository };
