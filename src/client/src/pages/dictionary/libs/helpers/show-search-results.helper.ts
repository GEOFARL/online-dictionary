import { hideElement, showElement } from "~/shared/index.js";

const showSearchResults = () => {
	hideElement(".loader-container");
	showElement(".search-results-container");
};

export { showSearchResults };
