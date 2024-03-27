import { PageTitle, PagesPath } from "~/libs/enums/enums.js";
import { type HTTPMethod } from "~/libs/modules/http/http.js";
import { type Application, type Controller } from "~/libs/types/types.js";

class DictionaryController implements Controller {
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
				title: PageTitle.DICTIONARY,
			});
		});
	}

	public init(app: Application): void {
		this.initPages(app);
	}

	public get name() {
		return "dictionary";
	}

	public get routes(): { httpMethod: HTTPMethod; path: string }[] {
		return [{ httpMethod: "GET", path: PagesPath.DICTIONARY }];
	}
}

export { DictionaryController };
