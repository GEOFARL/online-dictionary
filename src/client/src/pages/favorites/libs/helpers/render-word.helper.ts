import { PagesPath } from "@/libs/enums/enums.js";

import { dom, partOfSpeechToClassName } from "~/shared/index.js";

const renderWord = (word) => {
	return dom.createElement({
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
							alt: word?.image?.src ? word.image.alt : "Placeholder image",
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
			{
				attributes: {
					"data-word": word.word,
				},
				children: [
					{
						attributes: {
							alt: "bin icon",
							src: "/assets/icons/bin.svg",
						},
						tagName: "img",
					},
				],
				className: "remove-word-btn",
				tagName: "button",
			},
		],
		className: "word",
		parentElementSelector: ".words",
		tagName: "div",
	});
};

export { renderWord };
