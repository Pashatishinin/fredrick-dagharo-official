import type { SanityImageSource } from "@sanity/image-url";

export interface Category {
	title: string;
	slug: string;
	id: string;
}

export interface Description {
	desc: string;
	_key?: string;
}

export interface ProjectData {
	title: string;
	subTitle: string;
	img: SanityImageSource;
	isBig: boolean;
	gifImage?: SanityImageSource;
	videoUrl?: string;
	description: Description[];
	date: string;
	categories: Category[];
}

export type ProjectWithUrls = Omit<ProjectData, "img" | "gifImage"> & {
	imageUrl: string | null;
	gifUrl: string | null;
};

export interface PreLoaderData {
	preLoader: SanityImageSource;
}

export interface TransitionData {
	transitionLoader: SanityImageSource;
}
