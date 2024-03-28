import { type DOM } from "./libs/types/dom.type.js";

class BaseDOM implements DOM {
	changeAttribute(selector: string, attribute: string, value: string): void {
		const element = document.querySelector(selector);
		if (element) {
			element.setAttribute(attribute, value);
		}
	}

	getElement<T extends HTMLElement>(selector: string): T | null {
		const element = document.querySelector<T>(selector);

		return element ?? null;
	}

	setListener({
		eventType,
		listener,
		selector,
	}: {
		eventType: string;
		listener: () => Promise<void> | void;
		selector: string;
	}) {
		const element = this.getElement(selector);

		element.addEventListener(eventType, listener);
	}

	setText({ selector, text }: { selector: string; text: string }): void {
		const element = this.getElement(selector);

		element.innerText = text;
	}
}

export { BaseDOM };
