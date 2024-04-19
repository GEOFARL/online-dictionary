type DBRecord<T> = T & {
	created_at: string;
	id: number;
	updated_at: string;
};

export { type DBRecord };
