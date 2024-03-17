import { type Express } from "express";

type Controller = {
	init: (app: Express) => void;
};

export { type Controller };
