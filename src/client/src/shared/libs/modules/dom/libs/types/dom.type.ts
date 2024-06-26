import { type CreateElementOptions } from "./create-element-options.type.js";

type DOM = {
	addClassName(options: {
		className: string;
		element?: HTMLElement;
		selector?: string;
	}): void;
	changeAttribute: (options: {
		attribute: string;
		selector: string;
		value: string;
	}) => void;
	clearContent: (selector: string) => void;
	createElement: (options: CreateElementOptions) => HTMLElement;
	getAllElements: <T extends HTMLElement>(selector: string) => T[];
	getAttribute: (options: {
		attribute: string;
		element?: HTMLElement;
		selector?: string;
	}) => null | string;
	getElement: <T extends HTMLElement>(selector: string) => T | null;
	removeClassName: (options: { className: string; selector: string }) => void;
	removeElement: (options: {
		element?: HTMLElement;
		selector?: string;
	}) => void;
	setListener: (options: {
		element?: HTMLElement;
		eventType: string;
		listener: (event: Event) => void;
		selector?: string;
	}) => void;
	setText: (options: { selector: string; text: string }) => void;
};

export { type DOM };
