import { type DOM } from "./libs/types/dom.type.js";

class BaseDOM implements DOM {
	addClassName({
		className,
		selector,
	}: {
		className: string;
		selector: string;
	}): void {
		this.getElement(selector)?.classList.add(className);
	}

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

	clearContent(selector: string): void {
		const element = this.getElement(selector);

		if (element) {
			element.innerHTML = "";
		}
	}

	createElement({
		className,
		content,
		parentElementSelector,
		tagName,
	}: {
		className?: string | string[];
		content?: string;
		parentElementSelector?: string;
		tagName: keyof HTMLElementTagNameMap;
	}): HTMLElement {
		const element = document.createElement(tagName);

		if (Array.isArray(className)) {
			element.classList.add(...className);
		} else {
			element.classList.add(className);
		}

		if (content) {
			element.innerHTML = content;
		}

		if (parentElementSelector) {
			const parent = this.getElement(parentElementSelector);
			parent.appendChild(element);
		}

		return element;
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

	removeClassName({
		className,
		selector,
	}: {
		className: string;
		selector: string;
	}) {
		this.getElement(selector)?.classList.remove(className);
	}

	setListener({
		eventType,
		listener,
		selector,
	}: {
		eventType: string;
		listener: (event: Event) => Promise<void> | void;
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
