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
	type WordOfTheDayDto,
} from "../dictionary/dictionary.js";
import { type ExploreRepository } from "./explore.repository.js";

class ExploreService {
	private dictionaryService: DictionaryService;

	private exploreRepository: ExploreRepository;

	private randomWords: RandomWords;

	private taskScheduler: TaskScheduler;

	public constructor({
		dictionaryService,
		exploreRepository,
		randomWords,
		taskScheduler,
	}: {
		dictionaryService: DictionaryService;
		exploreRepository: ExploreRepository;
		randomWords: RandomWords;
		taskScheduler: TaskScheduler;
	}) {
		this.dictionaryService = dictionaryService;
		this.exploreRepository = exploreRepository;
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

	public getWordOfTheDay() {
		return this.exploreRepository.getLastWordOfTheDay();
	}

	public initCrone() {
		this.taskScheduler.schedule(CronExpression.EVERY_MIDNIGHT, async () => {
			const word = await this.getValidWord();

			const wordOfTheDay: WordOfTheDayDto = {
				image: word.images[FIRST_ARRAY_ELEMENT],
				meaning:
					word.meanings[FIRST_ARRAY_ELEMENT].definitions[FIRST_ARRAY_ELEMENT]
						.definition,
				partOfTheSpeech: word.meanings[FIRST_ARRAY_ELEMENT].partOfSpeech,
				word: capitalize(word.word),
			};

			await this.exploreRepository.saveWordOfTheDay(wordOfTheDay);
		});
	}
}

export { ExploreService };
