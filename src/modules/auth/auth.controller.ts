import { ApiPath, PageTitle } from "~/libs/enums/enums.js";
import { type Application } from "~/libs/types/types.js";

class AuthController {
	public init(app: Application) {
		app.get(ApiPath.SIGN_UP, (req, res) => {
			res.render("pages/sign-up", { title: PageTitle.SIGN_UP });
		});
	}
}

export { AuthController };
