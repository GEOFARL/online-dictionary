type WordDto = {
	images: {
		alt: string;
		src: string;
	}[];
	isLiked?: boolean;
	meanings: {
		antonyms: string[];
		definitions: {
			definition: string;
			example?: string;
		}[];
		partOfSpeech: string;
		synonyms: string[];
	}[];
	phonetic: {
		audio: string;
		text: string;
	};
	word: string;
};

export { type WordDto };
