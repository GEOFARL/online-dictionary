import { type DOM } from "./libs/types/dom.type.js";

class BaseDOM implements DOM {
	changeAttribute({
		attribute,
		selector,
		value,
	}: {
		attribute: string;
		selector: string;
		value: string;
	}): void {
		const element = this.getElement(selector);
		if (element) {
			element.setAttribute(attribute, value);
		}
	}

	getAttribute({
		attribute,
		selector,
	}: {
		attribute: string;
		selector: string;
	}): null | string {
		const element = this.getElement(selector);
		if (element) {
			return element.getAttribute(attribute);
		}
		return null;
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
