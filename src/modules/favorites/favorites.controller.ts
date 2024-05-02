import { ApiPath, PageTitle, PagesPath } from "~/libs/enums/enums.js";
import { asyncHandler } from "~/libs/helpers/helpers.js";
import { type HTTPMethod } from "~/libs/modules/http/http.js";
import { type Application, type Controller } from "~/libs/types/types.js";

import { type DictionaryService } from "../dictionary/dictionary.js";

class FavoritesController implements Controller {
	private dictionaryService: DictionaryService;

	public constructor({
		dictionaryService,
	}: {
		dictionaryService: DictionaryService;
	}) {
		this.dictionaryService = dictionaryService;
	}

	private initPages(app: Application) {
		/**
		 * @swagger
		 * /favorites:
		 *   get:
		 *     tags:
		 *       - Pages
		 *     description: Renders the favorites page with liked words
		 *     responses:
		 *       200:
		 *         description: HTML page for the favorites page
		 *         content:
		 *           text/html:
		 *             schema:
		 *               type: string
		 *               description: HTML content of the favorites page.
		 *       500:
		 *         $ref: '#/components/responses/InternalServerError'
		 */
		app.get(
			PagesPath.FAVORITES,
			asyncHandler(async (req, res): Promise<void> => {
				if (!req.user) {
					return res.redirect(PagesPath.SIGN_IN);
				}
				res.render(`pages${PagesPath.FAVORITES}`, {
					dictionaryPath: PagesPath.DICTIONARY,
					explorePath: PagesPath.EXPLORE,
					favoriteWords: await this.dictionaryService.getFavoriteWords({
						userId: req.user.id,
					}),
					favoritesPath: PagesPath.FAVORITES,
					homePath: PagesPath.ROOT,
					isAuthorized: Boolean(req.user),
					logOutPath: ApiPath.AUTH_LOG_OUT,
					settingsPath: PagesPath.SETTINGS,
					signInPath: PagesPath.SIGN_IN,
					signUpPath: PagesPath.SIGN_UP,
					title: PageTitle.SETTINGS,
					user: req.user,
					username: req.user.fullName,
				});
				return await Promise.resolve();
			}),
		);
	}

	init(app: Application): void {
		this.initPages(app);
	}

	get name() {
		return "favorites";
	}

	get routes(): { httpMethod: HTTPMethod; path: string }[] {
		return [{ httpMethod: "GET", path: PagesPath.FAVORITES }];
	}
}

export { FavoritesController };
