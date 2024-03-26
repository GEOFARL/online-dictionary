import { ApiPath, PageTitle, PagesPath } from "~/libs/enums/enums.js";
import { asyncHandler } from "~/libs/helpers/helpers.js";
import { HTTPCode, type HTTPMethod } from "~/libs/modules/http/http.js";
import { type Application, type Controller } from "~/libs/types/types.js";
import { validate } from "~/middlewares/validate/validate.js";

import {
	userSignInValidationSchema,
	userSignUpValidationSchema,
} from "../user/user.js";
import { type AuthService } from "./auth.service.js";

/**
 * @swagger
 * components:
 *   responses:
 *     InternalServerError:
 *       description: Internal Server Error
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: Error message
 *               status:
 *                 type: integer
 *                 description: HTTP status code
 *                 example: 500
 *     NotFoundError:
 *       description: Not Found
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: Error message
 *               status:
 *                 type: integer
 *                 description: HTTP status code
 *                 example: 404
 *     UnauthorizedError:
 *       description: Unauthorized
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: Error message
 *               status:
 *                 type: integer
 *                 description: HTTP status code
 *                 example: 401
 *   schemas:
 *     UserAuthSignInRequestDto:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         password:
 *           type: string
 *           format: password
 *           description: User's password
 *       example:
 *         email: user@example.com
 *         password: yourpassword
 *
 *     UserAuthSignUpRequestDto:
 *       type: object
 *       required:
 *         - email
 *         - fullName
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         fullName:
 *           type: string
 *           description: User's full name
 *         password:
 *           type: string
 *           format: password
 *           description: User's password
 *       example:
 *         email: user@example.com
 *         fullName: John Doe
 *         password: yourpassword
 */
class AuthController implements Controller {
	private authService: AuthService;

	public constructor({ authService }: { authService: AuthService }) {
		this.authService = authService;
	}

	private initPages(app: Application) {
		/**
		 * @swagger
		 * /sign-up:
		 *   get:
		 *     tags:
		 *       - Pages
		 *     description: Renders the sign-up page for new users.
		 *     responses:
		 *       200:
		 *         description: HTML page for signing up.
		 *         content:
		 *           text/html:
		 *             schema:
		 *               type: string
		 *               description: HTML content of the sign-up page.
		 *       500:
		 *         $ref: '#/components/responses/InternalServerError'
		 */
		app.get(PagesPath.SIGN_UP, (req, res) => {
			res.render(`pages${PagesPath.SIGN_UP}`, {
				routePath: ApiPath.AUTH_SIGN_UP,
				title: PageTitle.SIGN_UP,
			});
		});

		/**
		 * @swagger
		 * /sign-in:
		 *   get:
		 *     tags:
		 *       - Pages
		 *     description: Renders the sign-in page for existing users.
		 *     responses:
		 *       200:
		 *         description: HTML page for signing in.
		 *         content:
		 *           text/html:
		 *             schema:
		 *               type: string
		 *               description: HTML content of the sign-in page.
		 *       500:
		 *         $ref: '#/components/responses/InternalServerError'
		 */
		app.get(PagesPath.SIGN_IN, (req, res) => {
			res.render(`pages${PagesPath.SIGN_IN}`, {
				routePath: ApiPath.AUTH_SIGN_IN,
				title: PageTitle.SIGN_IN,
			});
		});
	}

	private initRoutes(app: Application) {
		/**
		 * @swagger
		 * /auth/sign-up:
		 *   post:
		 *     tags:
		 *       - Authentication
		 *     summary: User sign-up
		 *     description: Registers a new user and returns user details upon successful registration.
		 *     requestBody:
		 *       required: true
		 *       content:
		 *         application/json:
		 *           schema:
		 *             $ref: '#/components/schemas/UserAuthSignUpRequestDto'
		 *     responses:
		 *       201:
		 *         description: User successfully registered
		 *       500:
		 *         $ref: '#/components/responses/InternalServerError'
		 */
		app.post(
			ApiPath.AUTH_SIGN_IN,
			validate({ body: userSignInValidationSchema }),
			asyncHandler(async (req, res) => {
				const response = await this.authService.logInUser(req.body);

				res.status(HTTPCode.OK).json(response);
			}),
		);

		/**
		 * @swagger
		 * /auth/sign-in:
		 *   post:
		 *     tags:
		 *       - Authentication
		 *     summary: User sign-in
		 *     description: Authenticates a user and returns a token upon successful authentication.
		 *     requestBody:
		 *       required: true
		 *       content:
		 *         application/json:
		 *           schema:
		 *             $ref: '#/components/schemas/UserAuthSignInRequestDto'
		 *     responses:
		 *       200:
		 *         description: Successfully authenticated
		 *       401:
		 *         $ref: '#/components/responses/UnauthorizedError'
		 *       404:
		 *         $ref: '#/components/responses/NotFoundError'
		 *       500:
		 *         $ref: '#/components/responses/InternalServerError'
		 */
		app.post(
			ApiPath.AUTH_SIGN_UP,
			validate({ body: userSignUpValidationSchema }),
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
