import { type NextFunction, type Request, type Response } from "express";
import { type AnyZodObject } from "zod";

import { type Middleware } from "~/libs/types/types.js";

class ValidateMiddleware implements Middleware {
	public init() {}

	public validate({
		body: bodySchema,
		params: paramsSchema,
	}: {
		body?: AnyZodObject;
		params?: AnyZodObject;
	}) {
		return async (req: Request, _: Response, next: NextFunction) => {
			try {
				if (bodySchema) {
					await bodySchema.parseAsync(req.body);
				}

				if (paramsSchema) {
					await paramsSchema.parseAsync(req.params);
				}
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
