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

const configure = (): void => {
	configureMobileSidebar();
	configureUserMenu();

	dom.getAllElements(".badge").forEach((badge) => {
		dom.addClassName({
			className: partOfSpeechToClassName[badge.innerHTML.trim()],
			element: badge,
		});
	});

	dom.getAllElements(".remove-word-btn").forEach((button) => {
		const word = dom.getAttribute({
			attribute: "data-word",
			element: button,
		});

		dom.setListener({
			element: button,
			eventType: "click",
			listener: async () => {
				try {
					const data = await api.post<{ data: string } | boolean>({
						path: ApiPath.WORDS_$WORD_UNLIKE.replace(":word", word),
					});

					if (typeof data === "boolean" || !("status" in data)) {
						notification.success(NotificationMessage.WORD_UNLIKE_SUCCESS);
						dom.removeElement({ selector: `.word[data-word="${word}"]` });
					} else if ("message" in data) {
						notification.error(data.message as string);
					}
				} catch (error) {
					if (error instanceof Error) {
						notification.error(error.message);
					}
				}
			},
		});
	});
};

export { configure };
