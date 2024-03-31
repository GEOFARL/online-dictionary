import { type ImageDto } from "./image-dto.type.js";

type Pexels = {
	findImage: (search: string) => Promise<ImageDto[] | null>;
};

export { type Pexels };
