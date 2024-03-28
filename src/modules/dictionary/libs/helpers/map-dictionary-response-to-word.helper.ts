import { FIRST_ARRAY_ELEMENT } from "~/libs/constants/constants.js";

import { type DictionaryResponseDto, type WordDto } from "../types/types.js";

const mapDictionaryResponseToWord = (
	dictionaryResponse: DictionaryResponseDto,
): WordDto => {
	const firstItem = Array.isArray(dictionaryResponse)
		? dictionaryResponse[FIRST_ARRAY_ELEMENT]
		: dictionaryResponse;

	const wordDto: WordDto = {
		meanings: firstItem.meanings,
		phonetic: firstItem.phonetics.find(
			(phonetic) => phonetic.text === firstItem.phonetic,
		),
		word: firstItem.word,
	};

	return wordDto;
};

export { mapDictionaryResponseToWord };
