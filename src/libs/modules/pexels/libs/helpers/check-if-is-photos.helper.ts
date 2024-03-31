import { type ErrorResponse, type PhotosWithTotalResults } from "pexels";

const checkIfIsPhotos = (
	variable: ErrorResponse | PhotosWithTotalResults,
): variable is PhotosWithTotalResults => {
	return "total_results" in variable;
};

export { checkIfIsPhotos };
