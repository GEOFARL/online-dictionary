import { ApiPath, PageTitle, PagesPath } from "~/libs/enums/enums.js";
import { asyncHandler, selectRandomItems } from "~/libs/helpers/helpers.js";
import { HTTPCode, type HTTPMethod } from "~/libs/modules/http/http.js";
import { type Application, type Controller } from "~/libs/types/types.js";
import { requiresAuthMiddleware } from "~/middlewares/middlewares.js";

import {
	NUMBER_OF_REVIEWS_TO_RENDER,
	REVIEWS,
} from "./libs/constants/constants.js";

class HomeController implements Controller {
	private initPages(app: Application) {
		/**
		 * @swagger
		 * /:
		 *   get:
		 *     tags:
		 *       - Pages
		 *     description: Renders the home page with links to other sections of the website
		 *     responses:
		 *       200:
		 *         description: HTML page for the home page
		 *         content:
		 *           text/html:
		 *             schema:
		 *               type: string
		 *               description: HTML content of the home page.
		 *       500:
		 *         $ref: '#/components/responses/InternalServerError'
		 */
		app.get(PagesPath.ROOT, (req, res) => {
			res.render(`pages${PagesPath.ROOT}index.ejs`, {
				dictionaryPath: PagesPath.DICTIONARY,
				explorePath: PagesPath.EXPLORE,
				homePath: PagesPath.ROOT,
				isAuthorized: Boolean(req.user),
				logOutPath: ApiPath.AUTH_LOG_OUT,
				reviews: selectRandomItems(REVIEWS, NUMBER_OF_REVIEWS_TO_RENDER),
				settingsPath: PagesPath.SETTINGS,
				signInPath: PagesPath.SIGN_IN,
				signUpPath: PagesPath.SIGN_UP,
				title: PageTitle.HOME,
			});
		});
	}

	private initRoutes(app: Application) {
		app.get(
			"/auth-test",
			asyncHandler(requiresAuthMiddleware),
			asyncHandler((req, res) => {
				res.status(HTTPCode.OK).json(true);
			}),
		);
	}

	init(app: Application): void {
		this.initPages(app);
		this.initRoutes(app);
	}

	get name() {
		return "home";
	}

	get routes(): { httpMethod: HTTPMethod; path: string }[] {
		return [{ httpMethod: "GET", path: PagesPath.ROOT }];
	}
}

export { HomeController };
