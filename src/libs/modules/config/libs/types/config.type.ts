import { type EnvironmentSchema } from "./environment-schema.type.js";

type LibraryConfig<T> = {
	ENV: T;
};

type Config = LibraryConfig<EnvironmentSchema>;

export { type Config };
