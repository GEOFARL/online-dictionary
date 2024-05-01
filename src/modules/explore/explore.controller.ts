import { ApiPath, PageTitle, PagesPath } from "~/libs/enums/enums.js";
import { asyncHandler } from "~/libs/helpers/helpers.js";
import { type HTTPMethod } from "~/libs/modules/http/http.js";
import { type Application, type Controller } from "~/libs/types/types.js";

import { type ExploreService } from "./explore.service.js";

class ExploreController implements Controller {
	private exploreService: ExploreService;

	public constructor({ exploreService }: { exploreService: ExploreService }) {
		this.exploreService = exploreService;
	}

	private initPages(app: Application) {
		/**
		 * @swagger
		 * /explore:
		 *   get:
		 *     tags:
		 *       - Pages
		 *     description: Renders the explore page showcasing a word of the day and other features
		 *     responses:
		 *       200:
		 *         description: HTML page for the explore section
		 *         content:
		 *           text/html:
		 *             schema:
		 *               type: string
		 *               description: HTML content of the explore page.
		 *       500:
		 *         $ref: '#/components/responses/InternalServerError'
		 */
		app.get(
			PagesPath.EXPLORE,
			asyncHandler(async (req, res) => {
				res.render(`pages${PagesPath.EXPLORE}`, {
					dictionaryPath: PagesPath.DICTIONARY,
					explorePath: PagesPath.EXPLORE,
					homePath: PagesPath.ROOT,
					isAuthorized: Boolean(req.user),
					logOutPath: ApiPath.AUTH_LOG_OUT,
					recentlyViewedWords:
						req.user?.id &&
						(await this.exploreService.getRecentlyViewedWords({
							userId: req.user?.id,
						})),
					settingsPath: PagesPath.SETTINGS,
					signInPath: PagesPath.SIGN_IN,
					signUpPath: PagesPath.SIGN_UP,
					title: PageTitle.EXPLORE,
					user: req.user,
					wordOfTheDay: await this.exploreService.getWordOfTheDay({
						userId: req.user?.id,
					}),
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
