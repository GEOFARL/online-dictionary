import { FIRST_ARRAY_ELEMENT } from "../constants/constants.js";

const capitalize = (str: string): string => {
	const ONE_ITEM_OFFSET = 1;

	return (
		str.charAt(FIRST_ARRAY_ELEMENT).toUpperCase() +
		str.slice(FIRST_ARRAY_ELEMENT + ONE_ITEM_OFFSET).toLowerCase()
	);
};

export { capitalize };
