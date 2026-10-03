import type { RawImage, Seo, SeoData } from "../../lib/base.types";

/** Сырой фильм из Sanity — то, что отдаёт FILM_FRAGMENT. */
export interface FilmData {
	title?: string;
	slug?: string;
	year?: string;
	info?: string;
	city?: string;
	client?: string;
	role?: string;
	/** Короткая петля, играет на карточке при наведении. */
	gif?: RawImage | null;
	/** Номер ролика на Vimeo — из него собирается обложка и плеер. */
	urlVimeo?: string;
	isBig?: boolean;
	isSelected?: boolean;
	/** Необязательные переопределения для страницы проекта. */
	seo?: SeoData | null;
}

/**
 * Фильм, готовый к отрисовке. Одна и та же сущность на главной,
 * в архиве и на странице проекта.
 */
export type Film = Omit<FilmData, "gif" | "seo"> & {
	/** Готовый url гифки — без пережатия, анимацию CDN не переживёт. */
	gif: string | null;
	/** Кадр с Vimeo. Считается один раз здесь, а не в каждой карточке. */
	cover: string;
	/** Пустые строки — страница проекта возьмёт название и описание фильма. */
	seo: Seo;
};
