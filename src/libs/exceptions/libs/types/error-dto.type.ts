import { type HTTPCode } from "~/libs/modules/http/http.js";
import { type ValueOf } from "~/libs/types/types.js";

type ErrorDto = {
	message: string;
	status: ValueOf<typeof HTTPCode>;
};

export { type ErrorDto };
