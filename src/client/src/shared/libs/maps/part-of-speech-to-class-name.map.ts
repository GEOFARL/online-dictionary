import { type PartOfSpeech } from "../types/types.js";

const partOfSpeechToClassName: Record<PartOfSpeech, string> = {
	adjective: "badge--blue",
	adverb: "badge--pink",
	conjunction: "badge--orange",
	interjection: "badge--lime",
	noun: "badge--yellow",
	preposition: "badge--aqua",
	pronoun: "badge--purple",
	verb: "badge--green",
};

export { partOfSpeechToClassName };
