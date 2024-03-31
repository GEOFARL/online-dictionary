import { type Navigation } from "./libs/types/types.js";

class BaseNavigation implements Navigation {
	public addQueryParameter(parameter: string, value: string) {
		const url = new URL(window.location.href);

		url.searchParams.set(parameter, value);

		global.history.replaceState({}, null, url);
	}

	public navigate(path: string): void {
		window.location.replace(path);
	}
}

export { BaseNavigation };
