import { z } from "zod";

import {
	DictionaryValidationMessage,
	DictionaryValidationRule,
} from "../enums/enums.js";

const wordSearch = z.object({
	word: z.string().trim().min(DictionaryValidationRule.FIELD_MINIMUM_LENGTH, {
		message: DictionaryValidationMessage.FIELD_REQUIRED,
	}),
});

export { wordSearch };
