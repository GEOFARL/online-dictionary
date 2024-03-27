type DictionaryResponseDto = {
	license: unknown;
	meanings: {
		antonyms: string[];
		definitions: {
			definition: string;
			example?: string;
		}[];
		partOfSpeech: string;
		synonyms: string[];
	}[];
	phonetic: string;
	phonetics: {
		audio: string;
		license: unknown;
		sourceUrl: string;
		text: string;
	}[];
	sourceUrls: string[];
	word: string;
}[];

export { type DictionaryResponseDto };
