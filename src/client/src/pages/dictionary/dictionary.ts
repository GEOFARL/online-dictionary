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
		audioSrc = data.phonetic.audio;
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
				className: ["definition", `definition--${index}`],
				parentElementSelector: ".definitions-container",
				tagName: "div",
			});

			dom.createElement({
				className: "definition__word",
				content: `${data.word} (${meaning.partOfSpeech})`,
				parentElementSelector: `.definition--${index}`,
				tagName: "p",
			});

			dom.createElement({
				className: ["definition-list", `definition-list--${index}`],
				parentElementSelector: `.definition--${index}`,
				tagName: "ul",
			});

			meaning.definitions.forEach((definition) => {
				const exampleParagraph = `<p class="example">Example: ${definition?.example}</p>`;

				dom.createElement({
					className: "definition-list-item",
					content: `<p>${definition.definition}</p>${definition.example ? exampleParagraph : ""}`,
					parentElementSelector: `.definition-list--${index}`,
					tagName: "li",
				});
			});
		});
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
