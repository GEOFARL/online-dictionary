type DOM = {
	getElement: <T extends HTMLElement>(selector: string) => T | null;
	setListener: (options: {
		eventType: string;
		listener: (event: Event) => void;
		selector: string;
	}) => void;
	setText: (options: { selector: string; text: string }) => void;
};

export { type DOM };
