import { ApiPath, PageTitle, PagesPath } from "~/libs/enums/enums.js";
import { asyncHandler } from "~/libs/helpers/helpers.js";
import { HTTPCode, type HTTPMethod } from "~/libs/modules/http/http.js";
import { type Application, type Controller } from "~/libs/types/types.js";
import { validate } from "~/middlewares/middlewares.js";

import { type AuthService } from "../auth/auth.js";
import { type DictionaryService } from "./dictionary.service.js";
import { wordSearch as wordSearchValidationSchema } from "./libs/validation-schemas/validation-schemas.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     WordDto:
 *       type: object
 *       properties:
 *         meanings:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               antonyms:
 *                 type: array
 *                 items:
 *                   type: string
 *               definitions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     definition:
 *                       type: string
 *                     example:
 *                       type: string
 *                       nullable: true
 *               partOfSpeech:
 *                 type: string
 *               synonyms:
 *                 type: array
 *                 items:
 *                   type: string
 *         phonetic:
 *           type: object
 *           properties:
 *             audio:
 *               type: string
 *             text:
 *               type: string
 *         word:
 *           type: string
 */
class DictionaryController implements Controller {
	private authService: AuthService;

	private dictionaryService: DictionaryService;

	public constructor({
		authService,
		dictionaryService,
	}: {
		authService: AuthService;
		dictionaryService: DictionaryService;
	}) {
		this.authService = authService;
		this.dictionaryService = dictionaryService;
	}

	private initPages(app: Application) {
		/**
		 * @swagger
		 * /dictionary:
		 *   get:
		 *     tags:
		 *       - Pages
		 *     description: Renders the dictionary page where words can searched
		 *     responses:
		 *       200:
		 *         description: HTML page for the dictionary page
		 *         content:
		 *           text/html:
		 *             schema:
		 *               type: string
		 *               description: HTML content of the dictionary page.
		 *       500:
		 *         $ref: '#/components/responses/InternalServerError'
		 */
		app.get(PagesPath.DICTIONARY, (req, res) => {
			res.render(`pages${PagesPath.DICTIONARY}`, {
				dictionaryPath: PagesPath.DICTIONARY,
				explorePath: PagesPath.EXPLORE,
				homePath: PagesPath.ROOT,
				isAuthorized: Boolean(req.user),
				logOutPath: ApiPath.AUTH_LOG_OUT,
				settingsPath: PagesPath.SETTINGS,
				signInPath: PagesPath.SIGN_IN,
				signUpPath: PagesPath.SIGN_UP,
				title: PageTitle.DICTIONARY,
				user: req.user,
			});
		});
	}

	private initRoutes(app: Application) {
		/**
		 * @swagger
		 * /words/:word:
		 *   get:
		 *     tags:
		 *       - Words
		 *     summary: Word search
		 *     description: Searches for the information about word
		 *     parameters:
		 *       - in: path
		 *         name: word
		 *         required: true
		 *         schema:
		 *           type: string
		 *         description: The word to search for
		 *     responses:
		 *       200:
		 *         description: Information about the word
		 *         content:
		 *           application/json:
		 *             schema:
		 *               $ref: '#/components/schemas/WordDto'
		 *       500:
		 *         $ref: '#/components/responses/InternalServerError'
		 */
		app.get(
			ApiPath.WORDS_$WORD,
			validate({ params: wordSearchValidationSchema }),
			asyncHandler(async (req, res) => {
				const response = await this.dictionaryService.searchWord({
					userId: req.user?.id,
					word: req.params.word,
				});

				res.status(HTTPCode.OK).json(response);
			}),
		);
	}

	public init(app: Application): void {
		this.initPages(app);
		this.initRoutes(app);
	}

	public get name() {
		return "dictionary";
	}

	public get routes(): { httpMethod: HTTPMethod; path: string }[] {
		return [
			{ httpMethod: "GET", path: PagesPath.DICTIONARY },
			{ httpMethod: "GET", path: ApiPath.WORDS_$WORD },
		];
	}
}

export { DictionaryController };
