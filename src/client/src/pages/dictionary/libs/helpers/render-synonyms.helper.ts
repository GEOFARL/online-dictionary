import { DIVISOR_FOR_PARITY, dom } from "~/shared/index.js";

const renderSynonyms = (
	synonyms: string[],
	parentElementSelector: string,
	index: number,
): void => {
	dom.createElement({
		children: [
			{
				children: [
					{
						className: "synonyms__heading",
						content: "Синоніми",
						tagName: "h3",
					},
				],
				className: "synonyms__header",
				tagName: "div",
			},
			{
				className: "separator",
				tagName: "hr",
			},
			{
				children: [
					{
						className: ["synonyms__list", "synonyms__list--1"],
						tagName: "ul",
					},
					{
						className: ["synonyms__list", "synonyms__list--2"],
						tagName: "ul",
					},
				],
				className: "synonyms__body",
				tagName: "div",
			},
		],
		className: ["synonyms-container", `synonyms-container-${index}`],
		parentElementSelector,
		tagName: "div",
	});

	synonyms.forEach((synonym, synonymIndex) => {
		const ZERO = 0;

		const parentList =
			synonymIndex % DIVISOR_FOR_PARITY === ZERO
				? `.synonyms-container-${index} .synonyms__list--1`
				: `.synonyms-container-${index} .synonyms__list--2`;

		dom.createElement({
			children: [
				{
					attributes: {
						"href": `/dictionary?word=${synonym}`,
					},
					className: "synonyms__list-item-link",
					content: synonym,
					tagName: "a",
				},
			],
			className: "synonyms__list-item",
			parentElementSelector: parentList,
			tagName: "li",
		});
	});
};

export { renderSynonyms };
