import { getVimeoThumbnail } from "../../../shared/utils/vimeo.utils";
import { mapGif } from "../../lib/image.mappers";
import { mapSeo } from "../../lib/seo.mappers";
import type { Film, FilmData } from "./film.types";

/**
 * Обложка берётся с Vimeo по номеру ролика — отдельной картинкой в студии
 * её заводить не нужно, кадр и так лежит рядом с видео. Запрос к oEmbed
 * сетевой, поэтому делаем его здесь один раз на фильм, а не в каждой
 * карточке, которая этот фильм показывает.
 */
export const mapFilm = async (film: FilmData): Promise<Film> => {
	const { gif, seo, ...rest } = film;

	return {
		...rest,
		gif: mapGif(gif),
		seo: mapSeo(seo),
		cover: await getVimeoThumbnail(film.urlVimeo),
	};
};

export const mapFilms = (films: FilmData[] | null | undefined): Promise<Film[]> =>
	Promise.all((films ?? []).map(mapFilm));
