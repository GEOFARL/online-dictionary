import { FIRST_ARRAY_ELEMENT } from "~/libs/constants/constants.js";
import { capitalize } from "~/libs/helpers/helpers.js";
import { type RandomWords } from "~/libs/modules/random-words/random-words.js";
import {
	CronExpression,
	type TaskScheduler,
} from "~/libs/modules/task-scheduler/task-scheduler.js";

import {
	type DictionaryService,
	type WordDto,
	type WordRecordDto,
} from "../dictionary/dictionary.js";

class ExploreService {
	private dictionaryService: DictionaryService;

	private randomWords: RandomWords;

	private taskScheduler: TaskScheduler;

	public constructor({
		dictionaryService,
		randomWords,
		taskScheduler,
	}: {
		dictionaryService: DictionaryService;
		randomWords: RandomWords;
		taskScheduler: TaskScheduler;
	}) {
		this.dictionaryService = dictionaryService;
		this.taskScheduler = taskScheduler;
		this.randomWords = randomWords;
	}

	private async getValidWord(): Promise<WordDto> {
		try {
			const word = await this.dictionaryService.searchWord({
				word: this.randomWords.generateWord(),
			});
			return word;
		} catch {
			return await this.getValidWord();
		}
	}

	public async getRecentlyViewedWords({
		userId,
	}: {
		userId: number;
	}): Promise<string[]> {
		return (await this.dictionaryService.getLatestWords({ userId })).map(
			(entry) => entry.word,
		);
	}

	public getWordOfTheDay({ userId }: { userId: number }) {
		return this.dictionaryService.getWordOfTheDay({ userId });
	}

	public initCrone() {
		this.taskScheduler.schedule(CronExpression.EVERY_MIDNIGHT, async () => {
			const word = await this.getValidWord();

			const wordOfTheDay: WordRecordDto = {
				partOfSpeech: word.meanings[FIRST_ARRAY_ELEMENT].partOfSpeech,
				word: capitalize(word.word),
			};

			await this.dictionaryService.saveWordOfTheDay(wordOfTheDay);
		});
	}
}

export { ExploreService };
