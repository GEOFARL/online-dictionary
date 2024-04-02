import { generate } from "random-words";

import { type RandomWords } from "./libs/types/types.js";

class BaseRandomWords implements RandomWords {
	public generateWord(): string {
		return generate() as string;
	}
}

export { BaseRandomWords };
