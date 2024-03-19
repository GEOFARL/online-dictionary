import { type Express } from "express";

import { type HTTPMethod } from "../modules/http/http.js";

type Controller = {
	init: (app: Express) => void;
	name: string;
	routes: { httpMethod: HTTPMethod; path: string }[];
};

export { type Controller };
