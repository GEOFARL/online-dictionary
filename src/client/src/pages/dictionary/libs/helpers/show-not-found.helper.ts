import { hideElement, showElement } from "~/shared/index.js";

const showNotFound = () => {
	hideElement(".loader-container");
	showElement(".search-not-found");
};

export { showNotFound };
