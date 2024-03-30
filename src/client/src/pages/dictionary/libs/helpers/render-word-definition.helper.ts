import { type WordDto } from "@/modules/dictionary/libs/types/types.js";

import {
	dom,
	hideElement,
	partOfSpeechToClassName,
	showElement,
} from "~/shared/index.js";

import { renderSynonyms } from "./render-synonyms.helper.js";

const renderWordDefinition = (
	data: WordDto,
	updateAudioSrcFn: (newValue: string) => void,
) => {
	const partsOfSpeech = new Set(
		data.meanings.map((meaning) => meaning.partOfSpeech),
	);

	showElement(".search-results__heading");
	showElement(".word");
	showElement(".transcription");
	showElement(".definitions");

	dom.setText({
		selector: ".word",
		text: data.word,
	});

	dom.setText({
		selector: ".transcription-content",
		text: data.phonetic?.text ?? "",
	});

	dom.clearContent(".badges");

	partsOfSpeech.forEach((partOfSpeech) => {
		dom.createElement({
			className: ["badge", partOfSpeechToClassName[partOfSpeech]],
			content: partOfSpeech,
			parentElementSelector: ".badges",
			tagName: "p",
		});
	});

	if (data.phonetic?.audio) {
		showElement(".play-transcription-btn");
		updateAudioSrcFn(data.phonetic.audio);
	} else {
		hideElement(".play-transcription-btn");
	}

	if (data.meanings) {
		dom.clearContent(".definitions");
		dom.createElement({
			className: "definitions__header",
			content: "Визначення",
			parentElementSelector: ".definitions",
			tagName: "h3",
		});

		dom.createElement({
			className: "definitions-container",
			parentElementSelector: ".definitions",
			tagName: "div",
		});

		data.meanings.forEach((meaning, index) => {
			dom.createElement({
				children: [
					{
						className: "definition__word",
						content: `${data.word} (${meaning.partOfSpeech})`,
						tagName: "p",
					},
					{
						children: meaning.definitions.map((definition) => {
							const exampleParagraph = `<p class="example">Example: ${definition?.example}</p>`;

							return {
								className: "definition-list-item",
								content: `<p>${definition.definition}</p>${definition.example ? exampleParagraph : ""}`,
								tagName: "li",
							};
						}),
						className: ["definition-list", `definition-list--${index}`],
						tagName: "ul",
					},
				],
				className: ["definition", `definition--${index}`],
				parentElementSelector: ".definitions-container",
				tagName: "div",
			});

			const hasSynonyms = meaning.synonyms?.length;

			if (hasSynonyms) {
				renderSynonyms(meaning.synonyms, `.definition--${index}`, index);
			}
		});
	}
};

export { renderWordDefinition };
