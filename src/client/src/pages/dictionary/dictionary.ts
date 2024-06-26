import { ApiPath } from "@/libs/enums/enums.js";
import { type WordDto } from "@/modules/dictionary/libs/types/types.js";
import { wordSearch as wordSearchValidationSchema } from "@/modules/dictionary/libs/validation-schemas/validation-schemas.js";
import "swiper/css";
import "swiper/css/navigation";

import {
	api,
	configureMobileSidebar,
	configureUserMenu,
	dom,
	hideElement,
	navigation,
	notification,
	validation,
} from "~/shared/index.js";

import {
	renderWordDefinition,
	resetSearchInput,
	showLoadingState,
	showNotFound,
	showSearchResults,
} from "./libs/helpers/helpers.js";
import { audio } from "./libs/modules/modules.js";

const configureSearchForm = ({ user }): void => {
	const handleFormSubmit = async () => {
		const inputValue = dom.getElement<HTMLInputElement>("#search").value;
		showLoadingState();

		try {
			if (
				!(await validation.validate<{ word: string }>({
					data: { word: inputValue },
					validationSchema: wordSearchValidationSchema,
				}))
			) {
				hideElement(".loader-container");
				return;
			}

			const data = await api.get<WordDto>({
				path: ApiPath.WORDS_$WORD.replace(":word", inputValue),
			});

			navigation.addQueryParameter("word", inputValue);

			if (!("status" in data)) {
				showSearchResults();
				renderWordDefinition(
					data,
					(newValue: string) => {
						audio.src = newValue;
					},
					user,
				);

				resetSearchInput();
			} else if ("message" in data) {
				showNotFound();
				notification.error(data.message as string);

				resetSearchInput();
			}
		} catch (error) {
			showNotFound();

			if (error instanceof Error) {
				notification.error(error.message);
			}
		}
	};

	const urlParams = new URLSearchParams(window.location.search);
	const searchWord = urlParams.get("word");

	if (searchWord) {
		dom.getElement<HTMLInputElement>("#search").value = searchWord;
		handleFormSubmit();
	}

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
			const audioObj = new Audio(audio.src);
			audioObj.play();
		},
		selector: ".play-transcription-btn",
	});
};

const configure = ({ user }): void => {
	configureSearchForm({ user });
	configureTranscriptionPlayer();
	configureMobileSidebar();
	configureUserMenu();
};

export { configure };
