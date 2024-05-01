import { api } from "~/libs/modules/api/api.js";

import { userService } from "../user/user.js";
import { DictionaryController } from "./dictionary.controller.js";
import { DictionaryRepository } from "./dictionary.repository.js";
import { DictionaryService } from "./dictionary.service.js";

const dictionaryRepository = new DictionaryRepository();

const dictionaryService = new DictionaryService({
	api,
	dictionaryRepository,
	userService,
});

const dictionaryController = new DictionaryController({
	dictionaryService,
});

export { type WordDto, type WordRecordDto } from "./libs/types/types.js";
export { type DictionaryService, dictionaryController, dictionaryService };
