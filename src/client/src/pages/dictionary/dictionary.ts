import { ApiPath } from "@/libs/enums/enums.js";
import { type WordDto } from "@/modules/dictionary/libs/types/types.js";

import { api, dom } from "~/shared/index.js";

const configure = (): void => {
	const handleFormSubmit = async () => {
		const inputValue = dom.getElement<HTMLInputElement>("#search").value;

		const data = await api.get<WordDto>({
			path: ApiPath.WORDS_$WORD.replace(":word", inputValue),
		});

		dom.setText({
			selector: ".word-meaning",
			text: JSON.stringify(data),
		});
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
};

export { configure };
