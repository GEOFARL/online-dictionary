import { ApiPath, PageTitle, PagesPath } from "~/libs/enums/enums.js";
import { asyncHandler } from "~/libs/helpers/helpers.js";
import { HTTPCode, type HTTPMethod } from "~/libs/modules/http/http.js";
import { type Application, type Controller } from "~/libs/types/types.js";

import { type AuthService } from "./auth.service.js";

class AuthController implements Controller {
	private authService: AuthService;

	public constructor({ authService }: { authService: AuthService }) {
		this.authService = authService;
	}

	private initPages(app: Application) {
		app.get(PagesPath.SIGN_UP, (req, res) => {
			res.render(`pages${PagesPath.SIGN_UP}`, {
				routePath: ApiPath.AUTH_SIGN_UP,
				title: PageTitle.SIGN_UP,
			});
		});

		app.get(PagesPath.SIGN_IN, (req, res) => {
			res.render(`pages${PagesPath.SIGN_IN}`, {
				routePath: ApiPath.AUTH_SIGN_IN,
				title: PageTitle.SIGN_IN,
			});
		});
	}

	private initRoutes(app: Application) {
		app.post(
			ApiPath.AUTH_SIGN_IN,
			asyncHandler(async (req, res) => {
				const response = await this.authService.logInUser(req.body);

				res.status(HTTPCode.OK).json(response);
			}),
		);

		app.post(
			ApiPath.AUTH_SIGN_UP,
			asyncHandler(async (req, res) => {
				const response = await this.authService.createUser(req.body);

				res.status(HTTPCode.CREATED).json(response);
			}),
		);
	}

	public init(app: Application) {
		this.initPages(app);
		this.initRoutes(app);
	}

	public get name() {
		return "auth";
	}

	public get routes(): { httpMethod: HTTPMethod; path: string }[] {
		return [
			{ httpMethod: "GET", path: PagesPath.SIGN_IN },
			{ httpMethod: "GET", path: PagesPath.SIGN_UP },
			{ httpMethod: "POST", path: ApiPath.AUTH_SIGN_IN },
			{ httpMethod: "POST", path: ApiPath.AUTH_SIGN_UP },
		];
	}
}

export { AuthController };
