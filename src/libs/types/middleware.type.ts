import { type Express } from "express";

type Middleware = {
	init: (app: Express) => void;
	name: string;
};

export { type Middleware };
