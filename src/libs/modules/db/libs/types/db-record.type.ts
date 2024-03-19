type DBRecord<T> = T & {
	createdAt: string;
	id: string;
};

export { type DBRecord };
