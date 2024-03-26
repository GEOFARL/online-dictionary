import { type NextFunction, type Request, type Response } from "express";
import { type AnyZodObject } from "zod";

import { type Middleware } from "~/libs/types/types.js";

class ValidateMiddleware implements Middleware {
	public init() {}

	public validate({ body: bodySchema }: { body?: AnyZodObject }) {
		return async (req: Request, _: Response, next: NextFunction) => {
			try {
				await bodySchema.parseAsync(req.body);
				next();
			} catch (error) {
				next(error);
			}
		};
	}

	public get name() {
		return "validate";
	}
}

export { ValidateMiddleware };
