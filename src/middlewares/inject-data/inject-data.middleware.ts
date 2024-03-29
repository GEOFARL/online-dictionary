import { type NextFunction, type Request, type Response } from "express";

import { type Application, type Middleware } from "~/libs/types/types.js";
import { type AuthService } from "~/modules/auth/auth.js";

class InjectDataMiddleware implements Middleware {
	private authService: AuthService;

	public constructor({ authService }: { authService: AuthService }) {
		this.authService = authService;
	}

	public init(app: Application): void {
		app.use(async (req: Request, _: Response, next: NextFunction) => {
			if (req.cookies?.token) {
				req.user = await this.authService.findByToken(req.cookies?.token);
			}

			next();
		});
	}

	public get name(): string {
		return "inject-data";
	}
}

export { InjectDataMiddleware };
