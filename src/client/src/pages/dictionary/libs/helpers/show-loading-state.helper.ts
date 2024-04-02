import { hideElement, showElement } from "~/shared/index.js";

const showLoadingState = () => {
	showElement(".loader-container");
	hideElement(".search-results-container");
	hideElement(".search-not-found");
	hideElement(".default-content");
};

export { showLoadingState };
