import { hideElement, showElement } from "~/shared/index.js";

const showLoadingState = () => {
	showElement(".loader-container");
	hideElement(".search-results");
	hideElement(".search-not-found");
};

export { showLoadingState };
