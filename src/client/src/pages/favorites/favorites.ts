import { ApiPath } from "@/libs/enums/enums.js";

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

import { renderWord } from "./libs/helpers/helpers.js";

const configure = (): void => {
	configureMobileSidebar();
	configureUserMenu();

	dom.getAllElements(".badge").forEach((badge) => {
		dom.addClassName({
			className: partOfSpeechToClassName[badge.innerHTML.trim()],
			element: badge,
		});
	});

	const setupRemoveBtns = () => {
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

	let page = 2;

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					// eslint-disable-next-line no-use-before-define
					loadFavorites();
				}
			});
		},
		{
			root: null,
			rootMargin: "0px",
			threshold: 1.0,
		},
	);

	const LAST_ELEMENT = -1;
	const NEXT_PAGE = 1;
	const FIRST_PAGE = 1;

	observer.observe(dom.getAllElements(".word").at(LAST_ELEMENT));

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
				path: `${ApiPath.WORDS_FAVORITES}?partOfSpeech=${checkedPartsOfSpeech.join(",")}&page=${page}`,
			});

			page += NEXT_PAGE;
			hideElement(".loader-container");
			if (dom.getAllElements(".word").at(LAST_ELEMENT)) {
				observer.unobserve(dom.getAllElements(".word").at(LAST_ELEMENT));
			}

			data?.forEach((word, index) => {
				const wordEl = renderWord(word);
				const ONE = 1;

				if (index === data.length - ONE) {
					observer.observe(wordEl);
				}
			});

			setupRemoveBtns();
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

			dom.clearContent(".words");
			page = FIRST_PAGE;
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

			dom.clearContent(".words");
			page = FIRST_PAGE;
			loadFavorites();
		},
		selector: ".filters__cta-clear-all",
	});

	dom.getAllElements(".filter__item-filter input").forEach((checkbox) => {
		dom.setListener({
			element: checkbox,
			eventType: "change",
			listener: () => {
				dom.clearContent(".words");
				page = FIRST_PAGE;
				loadFavorites();
			},
		});
	});
};

export { configure };
