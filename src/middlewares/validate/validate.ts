import { ValidateMiddleware } from "./validate.middleware.js";

const validateMiddleware = new ValidateMiddleware();
const { validate } = validateMiddleware;

export { validate, validateMiddleware };
