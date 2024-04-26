import { ApiPath } from "~/libs/enums/enums.js";
import { asyncHandler } from "~/libs/helpers/helpers.js";
import { HTTPCode, type HTTPMethod } from "~/libs/modules/http/http.js";
import { type Application, type Controller } from "~/libs/types/types.js";
import { validate } from "~/middlewares/validate/validate.js";

import { userProfileUpdate as userProfileUpdateValidationSchema } from "./libs/validation-schemas/user-profile-update.validation-schema";
import { type UserService } from "./user.service.js";

class UserController implements Controller {
	private userService: UserService;

	public constructor({ userService }: { userService: UserService }) {
		this.userService = userService;
	}

	private initRoutes(app: Application) {
		/**
		 * @swagger
		 * /user:
		 *   put:
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
		app.put(
			ApiPath.USER,
			validate({ body: userProfileUpdateValidationSchema }),
			asyncHandler(async (req, res) => {
				if (!req.user) {
					return;
				}

				const response = await this.userService.update(req.user.id, req.body);

				res.status(HTTPCode.OK).json(response);
			}),
		);
	}

	public init(app: Application) {
		this.initRoutes(app);
	}

	public get name() {
		return "user";
	}

	public get routes(): { httpMethod: HTTPMethod; path: string }[] {
		return [{ httpMethod: "PUT", path: ApiPath.USER }];
	}
}

export { UserController };
