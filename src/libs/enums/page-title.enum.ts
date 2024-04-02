import { APPLICATION_NAME } from "../constants/constants.js";

const PageTitle = {
	DICTIONARY: `${APPLICATION_NAME} | Words`,
	EXPLORE: `${APPLICATION_NAME} | Explore`,
	HOME: `${APPLICATION_NAME}`,
	NOT_FOUND: `${APPLICATION_NAME} | Not Found`,
	SIGN_IN: `${APPLICATION_NAME} | Sign In`,
	SIGN_UP: `${APPLICATION_NAME} | Sign Up`,
} as const;

export { PageTitle };
