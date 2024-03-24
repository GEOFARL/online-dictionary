import { type Cookies } from "./libs/types/types.js";

class BaseCookies implements Cookies {
	set(name: string, value: string) {
		document.cookie = `${name}=${value}`;
	}
}

export { BaseCookies };
