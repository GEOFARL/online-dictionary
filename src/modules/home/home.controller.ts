import { type Express } from "express";

import { PageTitle, PagesPath } from "~/libs/enums/enums.js";
import { asyncHandler } from "~/libs/helpers/helpers.js";
import { HTTPCode, type HTTPMethod } from "~/libs/modules/http/http.js";
import { type Controller } from "~/libs/types/types.js";
import { requiresAuthMiddleware } from "~/middlewares/middlewares.js";

class HomeController implements Controller {
	private initPages(app: Express) {
		app.get(PagesPath.ROOT, (req, res) => {
			res.render(`pages${PagesPath.ROOT}index.ejs`, {
				dictionaryRoute: PagesPath.DICTIONARY,
				title: PageTitle.HOME,
			});
		});
	}

	private initRoutes(app: Express) {
		app.get(
			"/auth-test",
			asyncHandler(requiresAuthMiddleware),
			asyncHandler((req, res) => {
				res.status(HTTPCode.OK).json(true);
			}),
		);
	}

	init(app: Express): void {
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
