import { api } from "~/libs/modules/api/api.js";
import { db } from "~/libs/modules/db/db.js";

import { authService } from "../auth/auth.js";
import { DictionaryController } from "./dictionary.controller.js";
import { DictionaryRepository } from "./dictionary.repository.js";
import { DictionaryService } from "./dictionary.service.js";

const dictionaryRepository = new DictionaryRepository({
	db,
});

const dictionaryService = new DictionaryService({
	api,
	dictionaryRepository,
});

const dictionaryController = new DictionaryController({
	authService,
	dictionaryService,
});

export { dictionaryController };
