import type { Film, FilmData } from "../../film/model/film.types";
import type { Seo, SeoData } from "../../lib/base.types";

/** Сырой ответ запроса главной: SEO синглтона Home + избранные фильмы. */
export interface HomeData {
	seo?: SeoData | null;
	films?: FilmData[] | null;
}

export interface Home {
	seo: Seo;
	/** Только «Selected Film», новые сверху. */
	films: Film[];
}
