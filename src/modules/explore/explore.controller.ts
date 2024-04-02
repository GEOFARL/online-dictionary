import { PageTitle, PagesPath } from "~/libs/enums/enums.js";
import { asyncHandler } from "~/libs/helpers/async-handler.helper.js";
import { type HTTPMethod } from "~/libs/modules/http/http.js";
import { type Application, type Controller } from "~/libs/types/types.js";

import { type ExploreService } from "./explore.service.js";

class ExploreController implements Controller {
	private exploreService: ExploreService;

	public constructor({ exploreService }: { exploreService: ExploreService }) {
		this.exploreService = exploreService;
	}

	private initPages(app: Application) {
		app.get(
			PagesPath.EXPLORE,
			asyncHandler(async (_, res) => {
				res.render(`pages${PagesPath.EXPLORE}`, {
					dictionaryPath: PagesPath.DICTIONARY,
					title: PageTitle.EXPLORE,
					wordOfTheDay: await this.exploreService.getWordOfTheDay(),
				});
			}),
		);
	}

	init(app: Application): void {
		this.initPages(app);
	}

	get name() {
		return "explore";
	}

	get routes(): { httpMethod: HTTPMethod; path: string }[] {
		return [{ httpMethod: "GET", path: PagesPath.EXPLORE }];
	}
}

export { ExploreController };
