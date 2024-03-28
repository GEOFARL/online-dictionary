type DOM = {
	addClassName(options: { className: string; selector: string }): void;
	changeAttribute: (options: {
		attribute: string;
		selector: string;
		value: string;
	}) => void;
	clearContent: (selector: string) => void;
	createElement: (options: {
		className?: string;
		content?: string;
		parentElementSelector?: string;
		tagName: keyof HTMLElementTagNameMap;
	}) => HTMLElement;
	getAttribute: (options: {
		attribute: string;
		selector: string;
	}) => null | string;
	getElement: <T extends HTMLElement>(selector: string) => T | null;
	removeClassName: (options: { className: string; selector: string }) => void;
	setListener: (options: {
		eventType: string;
		listener: (event: Event) => void;
		selector: string;
	}) => void;
	setText: (options: { selector: string; text: string }) => void;
};

export { type DOM };
