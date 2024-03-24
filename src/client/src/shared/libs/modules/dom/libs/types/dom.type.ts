type DOM = {
	getElement: <T extends HTMLElement>(selector: string) => T | null;
	setText: (options: { selector: string; text: string }) => void;
};

export { type DOM };
