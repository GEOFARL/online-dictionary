import { type DictionaryResponseDto, type WordDto } from "../types/types.js";

const mapDictionaryResponseToWord = (
	dictionaryResponse: DictionaryResponseDto,
): WordDto => {
	const [firstItem] = dictionaryResponse;

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
