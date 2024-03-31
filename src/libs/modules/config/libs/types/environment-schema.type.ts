import { type AppEnvironment } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

type EnvironmentSchema = {
	APP: {
		ENVIRONMENT: ValueOf<typeof AppEnvironment>;
		HOST: string;
		PORT: number;
	};

	JWT: {
		SECRET: string;
	};

	PEXELS: {
		API_KEY: string;
	};
};

export { type EnvironmentSchema };
