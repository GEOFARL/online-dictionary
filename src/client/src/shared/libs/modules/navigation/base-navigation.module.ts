import { type Navigation } from "./libs/types/types.js";

class BaseNavigation implements Navigation {
	navigate(path: string): void {
		window.location.replace(path);
	}
}

export { BaseNavigation };
