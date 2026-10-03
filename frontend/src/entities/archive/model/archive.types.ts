import type { Film, FilmData } from "../../film/model/film.types";
import type { Seo, SeoData } from "../../lib/base.types";

/** Сырой ответ запроса архива: SEO синглтона Archive + все фильмы. */
export interface ArchiveData {
	seo?: SeoData | null;
	films?: FilmData[] | null;
}

/** Архив показывает те же фильмы, что и главная, только все и списком. */
export interface Archive {
	seo: Seo;
	/** Новые сверху, внутри года — по названию. */
	films: Film[];
}
