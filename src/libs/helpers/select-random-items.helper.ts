import {
	ApplicationError,
	ExceptionMessage,
} from "../exceptions/exceptions.js";

const selectRandomItems = <T>(items: T[], count: number): T[] => {
	if (count > items.length) {
		throw new ApplicationError({
			message: ExceptionMessage.COUNT_EXCEEDS_ARRAY_LENGTH,
		});
	}

	const selectedIndices = new Set<number>();
	const selectedItems: T[] = [];

	while (selectedItems.length < count) {
		const index = Math.floor(Math.random() * items.length);
		if (!selectedIndices.has(index)) {
			selectedIndices.add(index);
			selectedItems.push(items[index]);
		}
	}

	return selectedItems;
};

export { selectRandomItems };
