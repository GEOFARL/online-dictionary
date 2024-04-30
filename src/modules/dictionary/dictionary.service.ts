import { FIRST_ARRAY_ELEMENT } from "~/libs/constants/first-array-element.constant.js";
import { type API } from "~/libs/modules/api/api.js";
import { Word } from "~/libs/modules/db/models/models.js";
import { HTTPCode, HTTPError } from "~/libs/modules/http/http.js";
import { pexels } from "~/libs/modules/pexels/pexels.js";

import { type DictionaryRepository } from "./dictionary.repository.js";
import { MAXIMUM_NUMBER_OF_LATEST_WORDS } from "./libs/constants/constants.js";
import {
	DictionaryApiErrorTitle,
	DictionaryExceptionMessage,
} from "./libs/enums/enums.js";
import { mapDictionaryResponseToWord } from "./libs/helpers/helpers.js";
import {
	type DictionaryResponseDto,
	type WordDto,
	type WordRecordDto,
} from "./libs/types/types.js";

class DictionaryService {
	private api: API;

	private dictionaryRepository: DictionaryRepository;

	public constructor({
		api,
		dictionaryRepository,
	}: {
		api: API;
		dictionaryRepository: DictionaryRepository;
	}) {
		this.dictionaryRepository = dictionaryRepository;
		this.api = api;
	}

	public async getLatestWords({ userId }: { userId: number }): Promise<Word[]> {
		return await this.dictionaryRepository.getWordsViewedByUser(
			userId,
			MAXIMUM_NUMBER_OF_LATEST_WORDS,
		);
	}

	public async getWordOfTheDay() {
		const wordOfTheDay = await Word.findOne({
			where: { isWordOfTheDay: true },
		});

		if (!wordOfTheDay) {
			return null;
		}

		const word = await this.searchWord({ word: wordOfTheDay.word });

		return {
			image: word.images[FIRST_ARRAY_ELEMENT],
			meaning:
				word.meanings[FIRST_ARRAY_ELEMENT].definitions[FIRST_ARRAY_ELEMENT]
					.definition,
			partOfSpeech: word.meanings[FIRST_ARRAY_ELEMENT].partOfSpeech,
			word: wordOfTheDay.word,
		};
	}

	public async saveWordOfTheDay({
		partOfSpeech,
		word,
	}: WordRecordDto): Promise<void> {
		this.dictionaryRepository.saveWordOfTheDay({ partOfSpeech, word });
	}

	public async searchWord({
		userId,
		word,
	}: {
		userId?: number;
		word: string;
	}): Promise<WordDto> {
		const data = await this.api.get<DictionaryResponseDto>({
			path: `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
		});

		if ("title" in data) {
			if (data.title === DictionaryApiErrorTitle.NOT_FOUND) {
				throw new HTTPError({
					message: DictionaryExceptionMessage.WORD_NOT_FOUND,
					status: HTTPCode.NOT_FOUND,
				});
			} else {
				throw new HTTPError({
					message: DictionaryExceptionMessage.UNEXPECTED_ERROR,
					status: HTTPCode.INTERNAL_SERVER_ERROR,
				});
			}
		}

		const wordDtoWithoutImages: Omit<WordDto, "images"> =
			mapDictionaryResponseToWord(data);

		const images = await pexels.findImage(wordDtoWithoutImages.word);

		const wordDto: WordDto = {
			...wordDtoWithoutImages,
			images,
		};

		const existentWord = await this.dictionaryRepository.findWord(word);
		const isAlreadyExist = Boolean(existentWord);
		let wordId: null | number = isAlreadyExist ? existentWord.id : null;

		if (!isAlreadyExist) {
			wordId = await this.dictionaryRepository.addWord({
				partOfSpeech: wordDto.meanings
					.map((meaning) => meaning.partOfSpeech)
					.join(", "),
				word,
			});
		}

		if (userId) {
			await this.dictionaryRepository.incrementWordViewCount({
				userId,
				wordId,
			});
		}

		return wordDto;
	}
}

export { DictionaryService };
