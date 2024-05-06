import { ApiPath, PagesPath } from "@/libs/enums/enums.js";

import {
	HIDDEN_CLASS,
	NotificationMessage,
	api,
	configureMobileSidebar,
	configureUserMenu,
	dom,
	hideElement,
	notification,
	partOfSpeechToClassName,
	showElement,
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

	const loadFavorites = async () => {
		const checkedPartsOfSpeech = dom
			.getAllElements(".filter__item-filter input:checked")
			.map((checkboxEl) => (checkboxEl as HTMLInputElement).value);

		try {
			showElement(".loader-container");
			const data = await api.get<
				{
					image: {
						alt: string;
						src: string;
					};
					meaning: string;
					partOfSpeech: string[];
					word: string;
				}[]
			>({
				path: `${ApiPath.WORDS_FAVORITES}?partOfSpeech=${checkedPartsOfSpeech.join(",")}`,
			});
			hideElement(".loader-container");

			dom.clearContent(".words");

			data?.forEach((word) => {
				dom.createElement({
					attributes: {
						"data-word": word.word,
					},
					children: [
						{
							attributes: {
								href: `${PagesPath.DICTIONARY}?word=${word?.word ?? ""}`,
							},
							children: [
								{
									attributes: {
										alt: word?.image?.src
											? word.image.alt
											: "Placeholder image",
										src: word?.image?.src
											? word.image.src
											: "/assets/images/placeholder-image.jpg",
									},
									className: "word__image",
									tagName: "img",
								},
							],
							className: "word__image-container",
							tagName: "a",
						},
						{
							children: [
								{
									children: [
										{
											children: [
												{
													attributes: {
														href: `${PagesPath.DICTIONARY}?word=${word?.word ?? ""}`,
													},
													children: [
														{
															className: "word__word",
															content: word?.word ?? "No word",
															tagName: "h3",
														},
													],
													className: "word-link",
													tagName: "a",
												},
												{
													children: word?.partOfSpeech.map((partOfSpeech) => ({
														className: [
															"badge",
															partOfSpeechToClassName[partOfSpeech],
														],
														content: partOfSpeech,
														tagName: "div",
													})),
													className: "badges",
													tagName: "div",
												},
											],
											className: "word-container",
											tagName: "div",
										},
										{
											className: "word__description",
											content: word?.meaning ?? "",
											tagName: "p",
										},
									],
									className: "word-definition",
									tagName: "div",
								},
							],
							className: "word__content",
							tagName: "div",
						},
					],
					className: "word",
					parentElementSelector: ".words",
					tagName: "div",
				});
			});
		} catch (error) {
			if (error instanceof Error) {
				notification.error(error.message);
			}
		}
	};

	let isOpeningFilters = false;

	document.addEventListener("click", (event) => {
		const filtersEl = dom.getElement(".filters");

		if (
			!filtersEl ||
			isOpeningFilters ||
			filtersEl.contains(event.target as Node)
		) {
			return;
		}

		if (!filtersEl.classList.contains(HIDDEN_CLASS)) {
			hideElement(".filters");
		}
	});

	dom.setListener({
		eventType: "click",
		listener: () => {
			const DELAY = 100;

			if (dom.getElement(`.filters.${HIDDEN_CLASS}`)) {
				showElement(".filters");
				isOpeningFilters = true;

				setTimeout(() => {
					isOpeningFilters = false;
				}, DELAY);
			} else {
				hideElement(".filters");
			}
		},
		selector: ".favorites__button",
	});

	dom.setListener({
		eventType: "click",
		listener: () => {
			hideElement(".filters");
		},
		selector: ".filters__close-btn",
	});

	dom.setListener({
		eventType: "click",
		listener: () => {
			dom
				.getAllElements<HTMLInputElement>(".filter__item-filter input")
				.forEach((checkbox) => {
					// eslint-disable-next-line no-param-reassign
					checkbox.checked = true;
				});
			loadFavorites();
		},
		selector: ".filters__cta-reset",
	});

	dom.setListener({
		eventType: "click",
		listener: () => {
			dom
				.getAllElements<HTMLInputElement>(".filter__item-filter input")
				.forEach((checkbox) => {
					// eslint-disable-next-line no-param-reassign
					checkbox.checked = false;
				});
			loadFavorites();
		},
		selector: ".filters__cta-clear-all",
	});

	dom.getAllElements(".filter__item-filter input").forEach((checkbox) => {
		dom.setListener({
			element: checkbox,
			eventType: "change",
			listener: loadFavorites,
		});
	});
};

export { configure };
