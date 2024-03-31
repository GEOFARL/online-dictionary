import { createClient } from "pexels";

import { DEFAULT_NUMBER_OF_IMAGES } from "./libs/constants/constants.js";
import { checkIfIsPhotos } from "./libs/helpers/helpers.js";
import { type ImageDto, type Pexels } from "./libs/types/types.js";

class BasePexels implements Pexels {
	private client: ReturnType<typeof createClient>;

	public constructor({ apiKey }: { apiKey: string }) {
		this.client = createClient(apiKey);
	}

	public async findImage(search: string): Promise<ImageDto[] | null> {
		const searchResult = await this.client.photos.search({
			per_page: DEFAULT_NUMBER_OF_IMAGES,
			query: search,
		});

		if (checkIfIsPhotos(searchResult)) {
			return searchResult.photos.map((photo) => {
				return {
					alt: photo.alt,
					src: photo.src.original,
				};
			});
		}

		return null;
	}
}

export { BasePexels };
