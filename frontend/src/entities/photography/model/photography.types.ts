import type { RawImage, Seo, SeoData } from "../../lib/base.types";

/** Сырой документ `photography` из Sanity — один набор снимков. */
export interface PhotographySetData {
	photos?: RawImage[] | null;
}

/** Сырой ответ запроса страницы: SEO + все наборы. */
export interface PhotographyData {
	seo?: SeoData | null;
	sets?: PhotographySetData[] | null;
}

/**
 * Один снимок в галерее.
 * `width`/`height` — натуральные размеры оригинала, их считает сама Sanity
 * (asset->metadata.dimensions), руками в CMS никто ничего не вписывает.
 * Из них берутся только ПРОПОРЦИИ: форма карточки, превью и высота рамки.
 */
export interface Photo {
	/** Мелкая версия для карточек сетки. */
	thumb: string;
	/** Крупная версия для превью в слайдере. */
	src: string;
	alt: string;
	width: number;
	height: number;
	/** Размытая заглушка, пока грузится оригинал. */
	lqip: string | null;
}

/** Страница показывает один общий поток кадров из всех наборов. */
export interface Photography {
	seo: Seo;
	photos: Photo[];
}
