import { type API } from "./libs/types/types.js";

class BaseAPI implements API {
	async get<T>({ path }: { path: string }): Promise<T> {
		const response = await fetch(path);

		const payload = await response.json();

		return payload;
	}

	async post<T>({
		data,
		path,
	}: {
		data: unknown;
		path: string;
	}): Promise<T | null> {
		const response = await fetch(path, {
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
		});

		const payload = await response.json();

		return payload;
	}
}

export { BaseAPI };
