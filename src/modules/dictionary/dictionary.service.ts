import { type API } from "~/libs/modules/api/api.js";

import { type DictionaryRepository } from "./dictionary.repository.js";
import { mapDictionaryResponseToWord } from "./libs/helpers/helpers.js";
import {
	type DictionaryResponseDto,
	type WordDto,
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

		const wordDto: WordDto = mapDictionaryResponseToWord(data);

		if (userId) {
			const allWords: {
				userId: string;
				word: string;
			}[] = await this.dictionaryRepository.getAllWordsByUser(userId);

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
