import { type DOM } from "./libs/types/dom.type.js";
import { type CreateElementOptions } from "./libs/types/types.js";

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
