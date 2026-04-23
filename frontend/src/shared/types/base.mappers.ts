import type { SanityImageSource } from "@sanity/image-url";
import { urlForImage } from "../urlForImage";
import type { ProjectData, ProjectWithUrls } from "./base.types";

export const mapGif = (source: SanityImageSource | undefined): string | null => {
	if (!source) return null;
	return urlForImage(source).url();
};

export const mapImage = (source: SanityImageSource | undefined, width = 800): string | null => {
	if (!source) return null;
	return urlForImage(source).width(width).auto("format").quality(80).url();
};

export const mapProjectsWithUrls = (data: ProjectData): ProjectWithUrls => ({
	...data,
	imageUrl: mapImage(data.img, 1000),
	gifUrl: mapGif(data.gifImage),
});
