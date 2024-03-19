import { type Express } from "express";

import { PageTitle, PagesPath } from "~/libs/enums/enums.js";
import { HTTPCode, type HTTPMethod } from "~/libs/modules/http/http.js";
import { type Controller } from "~/libs/types/types.js";
import { requiresAuthMiddleware } from "~/middlewares/middlewares";

class HomeController implements Controller {
	private initPages(app: Express) {
		app.get(PagesPath.ROOT, (req, res) => {
			res.render(`pages${PagesPath.ROOT}index.ejs`, {
				title: PageTitle.SIGN_UP,
			});
		});
	}

	private initRoutes(app: Express) {
		app.get("/auth-test", requiresAuthMiddleware, (_, res) => {
			res.status(HTTPCode.OK).json(true);
		});
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
