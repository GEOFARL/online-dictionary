import { type API } from "~/libs/modules/api/api.js";
import { type DBRecord } from "~/libs/modules/db/db.js";
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

	public async getLatestWords({
		userId,
	}: {
		userId: string;
	}): Promise<DBRecord<WordRecordDto>[]> {
		const allUserWords =
			await this.dictionaryRepository.getAllWordsByUser(userId);

		return allUserWords.slice(-MAXIMUM_NUMBER_OF_LATEST_WORDS).reverse();
	}

	public async searchWord({
		userId,
		word,
	}: {
		userId?: string;
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

		if (userId) {
			const allWords: DBRecord<WordRecordDto>[] =
				await this.dictionaryRepository.getAllWordsByUser(userId);

			const hasWordAlready = allWords.some(
				(wordEntry) => wordEntry.word === word,
			);

			if (!hasWordAlready) {
				await this.dictionaryRepository.addWord({ userId, word });
			}
		}

		return wordDto;
	}
}

export { DictionaryService };
