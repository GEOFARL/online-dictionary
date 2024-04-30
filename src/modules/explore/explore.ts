import { randomWords } from "~/libs/modules/random-words/random-words.js";
import { taskScheduler } from "~/libs/modules/task-scheduler/task-scheduler.js";

import { dictionaryService } from "../dictionary/dictionary.js";
import { ExploreController } from "./explore.controller.js";
import { ExploreService } from "./explore.service.js";

const exploreService = new ExploreService({
	dictionaryService,
	randomWords,
	taskScheduler,
});

const exploreController = new ExploreController({
	exploreService,
});

export { exploreController, exploreService };
