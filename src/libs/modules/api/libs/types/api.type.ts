type API = {
	delete<T>(options: { path: string }): Promise<T | null>;
	get<T>(options: { path: string }): Promise<T | null>;
	post<T>(options: { data?: string; path: string }): Promise<T | null>;
	put<T>(options: { data: string; path: string }): Promise<T | null>;
};

export { type API };
