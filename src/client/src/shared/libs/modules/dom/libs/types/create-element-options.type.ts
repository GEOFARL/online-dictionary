type CreateElementOptions = {
	attributes?: Record<string, string>;
	children?: CreateElementOptions[];
	className?: string | string[];
	content?: string;
	parentElementSelector?: string;
	tagName: keyof HTMLElementTagNameMap;
};

export { type CreateElementOptions };
