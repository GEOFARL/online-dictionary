import { HIDDEN_CLASS } from "../constants/constants.js";
import { dom } from "../modules/dom/dom.js";

const hideElement = (selector: string) => {
	dom.addClassName({
		className: HIDDEN_CLASS,
		selector,
	});
};

export { hideElement };
