import { dictionaryService } from "../dictionary/dictionary.js";
import { FavoritesController } from "./favorites.controller.js";

const favoritesController = new FavoritesController({
	dictionaryService,
});

export { favoritesController };
