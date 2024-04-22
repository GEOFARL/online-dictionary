import { ApiPath, PageTitle, PagesPath } from "~/libs/enums/enums.js";
import { asyncHandler } from "~/libs/helpers/helpers.js";
import { type HTTPMethod } from "~/libs/modules/http/http.js";
import { type Application, type Controller } from "~/libs/types/types.js";

class SettingsController implements Controller {
	private initPages(app: Application) {
		/**
		 * @swagger
		 * /:
		 *   get:
		 *     tags:
		 *       - Pages
		 *     description: Renders the settings page enabling to change name and delete account
		 *     responses:
		 *       200:
		 *         description: HTML page for the settings page
		 *         content:
		 *           text/html:
		 *             schema:
		 *               type: string
		 *               description: HTML content of the settings page.
		 *       500:
		 *         $ref: '#/components/responses/InternalServerError'
		 */
		app.get(
			PagesPath.SETTINGS,
			asyncHandler(async (req, res): Promise<void> => {
				if (!req.user) {
					return res.redirect(PagesPath.SIGN_IN); // Redirect to sign-in page if not logged in
				}
				res.render(`pages${PagesPath.SETTINGS}`, {
					dictionaryPath: PagesPath.DICTIONARY,
					explorePath: PagesPath.EXPLORE,
					homePath: PagesPath.ROOT,
					isAuthorized: Boolean(req.user),
					logOutPath: ApiPath.AUTH_LOG_OUT,
					settingsPath: PagesPath.SETTINGS,
					signInPath: PagesPath.SIGN_IN,
					signUpPath: PagesPath.SIGN_UP,
					title: PageTitle.SETTINGS,
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
		return "settings";
	}

	get routes(): { httpMethod: HTTPMethod; path: string }[] {
		return [{ httpMethod: "GET", path: PagesPath.SETTINGS }];
	}
}

export { SettingsController };
