import type { SanityImageSource } from "@sanity/image-url";

/** Ссылка на ассет в Sanity — то, что лежит в поле типа `image`. */
export interface ImageAsset {
	_type?: "image";
	asset?: { _ref: string; _type: "reference" };
	hotspot?: unknown;
	crop?: unknown;
	/** Альт заводится отдельным полем в схеме рядом с картинкой. */
	alt?: string;
}

/** Размеры и заглушка приходят из метаданных ассета — их считает сама Sanity. */
export interface ImageMeta {
	dimensions?: { width: number; height: number; aspectRatio: number };
	/** Крошечная размытая версия кадра в base64 — ставится подложкой. */
	lqip?: string;
}

/** Картинка вместе с метаданными: именно это возвращает IMAGE_FRAGMENT. */
export interface RawImage extends ImageAsset {
	meta?: ImageMeta;
}

/**
 * Готовая к отрисовке картинка.
 * width/height нужны в разметке, чтобы браузер зарезервировал место
 * до загрузки и вёрстка не прыгала.
 */
export interface Image {
	url: string | null;
	alt: string;
	width: number | null;
	height: number | null;
	lqip: string | null;
}

/** Две версии одного кадра: мелкая для сеток, крупная для просмотра. */
export interface ResponsiveImage extends Image {
	thumb: string | null;
}

export interface Link {
	label: string;
	url: string;
}

/** Объект `seo` из студии — общий для всех страниц-синглтонов. */
export interface SeoData {
	title?: string;
	description?: string;
}

/** Пустая строка — поле не заполнено. */
export interface Seo {
	title: string;
	description: string;
}

export type { SanityImageSource };
