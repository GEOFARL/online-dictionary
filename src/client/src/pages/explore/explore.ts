import { ApiPath } from "@/libs/enums/enums.js";

import {
	NotificationMessage,
	api,
	configureMobileSidebar,
	configureUserMenu,
	dom,
	notification,
	partOfSpeechToClassName,
} from "~/shared/index.js";

const configure = ({
	partOfTheSpeech,
	word,
}: {
	partOfTheSpeech: string;
	word: string;
}): void => {
	dom.addClassName({
		className: partOfSpeechToClassName[partOfTheSpeech],
		selector: ".badge",
	});
	configureMobileSidebar();
	configureUserMenu();

	dom.setListener({
		eventType: "click",
		listener: async () => {
			try {
				let data;
				if (dom.getElement(".word-of-the-day__button.like-word")) {
					data = await api.post<{ data: string } | boolean>({
						path: ApiPath.WORDS_$WORD_LIKE.replace(":word", word),
					});
				} else {
					data = await api.post<{ data: string } | boolean>({
						path: ApiPath.WORDS_$WORD_UNLIKE.replace(":word", word),
					});
				}

				if (typeof data === "boolean" || !("status" in data)) {
					if (dom.getElement(".word-of-the-day__button.like-word")) {
						notification.success(NotificationMessage.WORD_LIKE_SUCCESS);

						dom.setText({
							selector: ".word-of-the-day__button",
							text: "Видалити зі збережених",
						});

						dom.removeClassName({
							className: "like-word",
							selector: ".word-of-the-day__button",
						});

						dom.addClassName({
							className: "unlike-word",
							selector: ".word-of-the-day__button",
						});
					} else {
						notification.success(NotificationMessage.WORD_UNLIKE_SUCCESS);

						dom.setText({
							selector: ".word-of-the-day__button",
							text: "Зберегти слово",
						});

						dom.removeClassName({
							className: "unlike-word",
							selector: ".word-of-the-day__button",
						});

						dom.addClassName({
							className: "like-word",
							selector: ".word-of-the-day__button",
						});
					}
				} else if ("message" in data) {
					notification.error(data.message as string);
				}
			} catch (error) {
				if (error instanceof Error) {
					notification.error(error.message);
				}
			}
		},
		selector: ".word-of-the-day__button",
	});
};

export { configure };
