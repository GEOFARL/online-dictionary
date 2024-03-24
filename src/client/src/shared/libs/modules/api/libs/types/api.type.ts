type API = {
	get<T>(options: { path: string }): Promise<T | null>;
	post<T>(options: { data: string; path: string }): Promise<T | null>;
};

export { type API };
