import { LAST_ARRAY_ELEMENT } from "~/libs/constants/constants.js";
import { type DB, type DBRecord } from "~/libs/modules/db/db.js";

import { type WordOfTheDayDto } from "../dictionary/dictionary.js";

class ExploreRepository {
	private db: DB;

	public constructor({ db }: { db: DB }) {
		this.db = db;
	}

	public async getLastWordOfTheDay(): Promise<DBRecord<WordOfTheDayDto>> {
		const allWordsOfTheDay = await this.db.WORD_OF_THE_DAY.getAll<{
			image_alt: string;
			image_src: string;
			meaning: string;
			part_of_speech: string;
			word: string;
		}>();

		const lastRecord = allWordsOfTheDay.at(LAST_ARRAY_ELEMENT);

		return {
			...lastRecord,
			image: {
				alt: lastRecord?.image_alt,
				src: lastRecord?.image_src,
			},
			partOfTheSpeech: lastRecord?.part_of_speech,
		};
	}

	public saveWordOfTheDay(wordOfTheDay: WordOfTheDayDto) {
		return this.db.WORD_OF_THE_DAY.insert({
			image_alt: wordOfTheDay.image.alt,
			image_src: wordOfTheDay.image.src,
			meaning: wordOfTheDay.meaning,
			part_of_speech: wordOfTheDay.partOfTheSpeech,
			word: wordOfTheDay.word,
		});
	}
}

export { ExploreRepository };
