import { dom } from "~/shared/index.js";

const resetSearchInput = () => {
	dom.getElement<HTMLInputElement>("#search").value = "";
};

export { resetSearchInput };
