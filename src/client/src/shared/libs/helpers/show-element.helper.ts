import { HIDDEN_CLASS } from "../constants/constants.js";
import { dom } from "../modules/dom/dom.js";

const showElement = (selector: string) => {
	dom.removeClassName({
		className: HIDDEN_CLASS,
		selector,
	});
};

export { showElement };
