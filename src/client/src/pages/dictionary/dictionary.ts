import { ApiPath } from "@/libs/enums/enums.js";
import { type WordDto } from "@/modules/dictionary/libs/types/types.js";

import {
	api,
	dom,
	hideElement,
	partOfSpeechToClassName,
	showElement,
} from "~/shared/index.js";

let audioSrc = "";

const renderWordDefinition = (data: WordDto) => {
	const partsOfSpeech = new Set(
		data.meanings.map((meaning) => meaning.partOfSpeech),
	);

	showElement(".search-results__heading");
	showElement(".word");
	showElement(".transcription");

	dom.setText({
		selector: ".word",
		text: data.word,
	});

	dom.setText({
		selector: ".transcription-content",
		text: data.phonetic.text,
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

	if (data.phonetic.audio) {
		showElement(".play-transcription-btn");
		audioSrc = data.phonetic.audio;
	} else {
		hideElement(".play-transcription-btn");
	}
};

const configureSearchForm = (): void => {
	const handleFormSubmit = async () => {
		const inputValue = dom.getElement<HTMLInputElement>("#search").value;

		const data = await api.get<WordDto>({
			path: ApiPath.WORDS_$WORD.replace(":word", inputValue),
		});

		renderWordDefinition(data);

		dom.getElement<HTMLInputElement>("#search").value = "";
	};

	dom.setListener({
		eventType: "submit",
		listener: (event: SubmitEvent) => {
			event.preventDefault();
		},
		selector: ".search__form",
	});

	dom.setListener({
		eventType: "keydown",
		listener: (event: KeyboardEvent) => {
			if (event.code === "Enter") {
				handleFormSubmit();
			}
		},
		selector: "#search",
	});

	dom.setListener({
		eventType: "click",
		listener: () => {
			handleFormSubmit();
		},
		selector: ".search__icon-container",
	});
};

const configureTranscriptionPlayer = (): void => {
	dom.setListener({
		eventType: "click",
		listener: () => {
			const audio = new Audio(audioSrc);
			audio.play();
		},
		selector: ".play-transcription-btn",
	});
};

const configure = (): void => {
	configureSearchForm();
	configureTranscriptionPlayer();
};

export { configure };
