import { type DOM } from "./libs/types/dom.type.js";
import { type CreateElementOptions } from "./libs/types/types.js";

class BaseDOM implements DOM {
	addClassName({
		className,
		element,
		selector,
	}: {
		className: string;
		element?: HTMLElement;
		selector?: string;
	}): void {
		if (element) {
			element.classList.add(className);
		} else {
			this.getElement(selector)?.classList.add(className);
		}
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
		attributes,
		children,
		className,
		content,
		parentElementSelector,
		tagName,
	}: CreateElementOptions): HTMLElement {
		const element = document.createElement(tagName);

		if (Array.isArray(className)) {
			element.classList.add(...className);
		} else {
			element.classList.add(className);
		}

		if (content) {
			element.innerHTML = content;
		}

		if (attributes) {
			Object.entries(attributes).forEach(([key, value]) => {
				element.setAttribute(key, value);
			});
		}

		if (parentElementSelector) {
			const parent = this.getElement(parentElementSelector);
			parent.appendChild(element);
		}

		if (children) {
			children.forEach((child) =>
				element.appendChild(this.createElement(child)),
			);
		}

		return element;
	}

	getAllElements<T extends HTMLElement>(selector: string): T[] {
		const elements = document.querySelectorAll<T>(selector);

		return Array.from(elements);
	}

	getAttribute({
		attribute,
		element,
		selector,
	}: {
		attribute: string;
		element?: HTMLElement;
		selector?: string;
	}): null | string {
		if (element) {
			return element.getAttribute(attribute);
		}

		const htmlElement = this.getElement(selector);
		if (htmlElement) {
			return htmlElement.getAttribute(attribute);
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

	removeElement({
		element,
		selector,
	}: {
		element?: HTMLElement;
		selector?: string;
	}) {
		if (selector) {
			this.getElement(selector).remove();
		} else {
			element.remove();
		}
	}

	setListener({
		element,
		eventType,
		listener,
		selector,
	}: {
		element?: HTMLElement;
		eventType: string;
		listener: (event: Event) => Promise<void> | void;
		selector?: string | string[];
	}) {
		if (selector) {
			if (Array.isArray(selector)) {
				selector.forEach((item) => {
					const htmlElement = this.getElement(item);

					htmlElement.addEventListener(eventType, listener);
				});
			} else {
				const htmlElement = this.getElement(selector);

				htmlElement.addEventListener(eventType, listener);
			}
		} else {
			element.addEventListener(eventType, listener);
		}
	}

	setText({ selector, text }: { selector: string; text: string }): void {
		const element = this.getElement(selector);

		element.innerText = text;
	}
}

export { BaseDOM };
