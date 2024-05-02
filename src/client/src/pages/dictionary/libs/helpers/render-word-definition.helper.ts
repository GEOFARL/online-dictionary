import { ApiPath } from "@/libs/enums/api-path.enum.js";
import { type WordDto } from "@/modules/dictionary/libs/types/types.js";

import {
	NotificationMessage,
	api,
	dom,
	hideElement,
	notification,
	partOfSpeechToClassName,
	showElement,
} from "~/shared/index.js";

import { MIN_ARRAY_LENGTH } from "../constants/constants.js";
import { swiper } from "../modules/modules.js";
import { swiperMobile } from "../modules/swiper/swiper.js";
import { renderSynonyms } from "./render-synonyms.helper.js";

const renderWordDefinition = (
	data: WordDto,
	updateAudioSrcFn: (newValue: string) => void,
	user,
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
		text: data.phonetic?.text ?? "no transcription",
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

		if (data.images && data.images.length >= MIN_ARRAY_LENGTH) {
			dom.clearContent(".images-slider .swiper-wrapper");
			dom.clearContent(".images-slider-mobile .swiper-wrapper");

			data.images.forEach((image) => {
				dom.createElement({
					children: [
						{
							attributes: {
								"alt": image.alt,
								"src": image.src,
							},
							tagName: "img",
						},
					],
					className: "swiper-slide",
					parentElementSelector: ".images-slider .swiper-wrapper",
					tagName: "div",
				});

				dom.createElement({
					children: [
						{
							attributes: {
								"alt": image.alt,
								"src": image.src,
							},
							tagName: "img",
						},
					],
					className: "swiper-slide",
					parentElementSelector: ".images-slider-mobile .swiper-wrapper",
					tagName: "div",
				});
			});

			swiper.init();
			swiperMobile.init();
		} else {
			dom.clearContent(".images-slider .swiper-wrapper");
			dom.clearContent(".images-slider-mobile .swiper-wrapper");

			dom.createElement({
				children: [
					{
						attributes: {
							"alt": "not found image",
							"class": "no-found__icon",
							"height": "80px",
							"src": "/assets/icons/image-not-found.svg",
							"width": "80px",
						},
						tagName: "img",
					},
				],
				className: "no-found",
				parentElementSelector: ".images-slider .swiper-wrapper",
				tagName: "div",
			});

			dom.createElement({
				children: [
					{
						attributes: {
							"alt": "not found image",
							"class": "no-found__icon",
							"height": "40px",
							"src": "/assets/icons/image-not-found.svg",
							"width": "40px",
						},
						tagName: "img",
					},
				],
				className: "no-found",
				parentElementSelector: ".images-slider-mobile .swiper-wrapper",
				tagName: "div",
			});
		}

		if (user) {
			dom.clearContent(".button-container");
			dom.clearContent(".button-container-mobile");

			dom.createElement({
				className: [
					"button",
					"word__button",
					data.isLiked ? "unlike-word" : "like-word",
				],
				content: data.isLiked ? "Видалити зі збережених" : "Зберегти слово",
				parentElementSelector: ".button-container",
				tagName: "button",
			});

			dom.createElement({
				className: [
					"button",
					"word__button",
					data.isLiked ? "unlike-word" : "like-word",
				],
				content: data.isLiked ? "Видалити зі збережених" : "Зберегти слово",
				parentElementSelector: ".button-container-mobile",
				tagName: "button",
			});

			dom.setListener({
				eventType: "click",
				listener: async () => {
					try {
						let data1;
						if (dom.getElement(".word__button.like-word")) {
							data1 = await api.post<{ data: string } | boolean>({
								path: ApiPath.WORDS_$WORD_LIKE.replace(":word", data.word),
							});
						} else {
							data1 = await api.post<{ data: string } | boolean>({
								path: ApiPath.WORDS_$WORD_UNLIKE.replace(":word", data.word),
							});
						}

						if (typeof data1 === "boolean" || !("status" in data1)) {
							if (dom.getElement(".button-container .word__button.like-word")) {
								notification.success(NotificationMessage.WORD_LIKE_SUCCESS);

								dom.setText({
									selector: ".button-container .word__button",
									text: "Видалити зі збережених",
								});

								dom.removeClassName({
									className: "like-word",
									selector: ".button-container .word__button",
								});

								dom.addClassName({
									className: "unlike-word",
									selector: ".button-container .word__button",
								});
							} else {
								notification.success(NotificationMessage.WORD_UNLIKE_SUCCESS);

								dom.setText({
									selector: ".button-container .word__button",
									text: "Зберегти слово",
								});

								dom.removeClassName({
									className: "unlike-word",
									selector: ".button-container .word__button",
								});

								dom.addClassName({
									className: "like-word",
									selector: ".button-container .word__button",
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
				selector: [".button-container .word__button"],
			});

			dom.setListener({
				eventType: "click",
				listener: async () => {
					try {
						let data1;
						if (dom.getElement(".word__button.like-word")) {
							data1 = await api.post<{ data: string } | boolean>({
								path: ApiPath.WORDS_$WORD_LIKE.replace(":word", data.word),
							});
						} else {
							data1 = await api.post<{ data: string } | boolean>({
								path: ApiPath.WORDS_$WORD_UNLIKE.replace(":word", data.word),
							});
						}

						if (typeof data1 === "boolean" || !("status" in data1)) {
							if (
								dom.getElement(
									".button-container-mobile .word__button.like-word",
								)
							) {
								notification.success(NotificationMessage.WORD_LIKE_SUCCESS);

								dom.setText({
									selector: ".button-container-mobile .word__button",
									text: "Видалити зі збережених",
								});

								dom.removeClassName({
									className: "like-word",
									selector: ".button-container-mobile .word__button",
								});

								dom.addClassName({
									className: "unlike-word",
									selector: ".button-container-mobile .word__button",
								});
							} else {
								notification.success(NotificationMessage.WORD_UNLIKE_SUCCESS);

								dom.setText({
									selector: ".button-container-mobile .word__button",
									text: "Зберегти слово",
								});

								dom.removeClassName({
									className: "unlike-word",
									selector: ".button-container-mobile .word__button",
								});

								dom.addClassName({
									className: "like-word",
									selector: ".button-container-mobile .word__button",
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
				selector: [".button-container-mobile .word__button"],
			});
		}
	}
};

export { renderWordDefinition };
