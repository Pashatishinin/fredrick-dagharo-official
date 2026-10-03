import groq from "groq";
import { client } from "../../../shared/client";
import type { FilmData } from "../../film/model/film.types";
import { FILM_FRAGMENT } from "../../lib/fragments";

/**
 * Все фильмы, у которых есть страница. Порядок тот же, что в архиве:
 * из него считаются «предыдущий» и «следующий».
 */
export async function getProjectFilms(): Promise<FilmData[]> {
	const query = groq`*[_type == "films" && defined(slug.current)] | order(year desc, title asc) {
    ${FILM_FRAGMENT}
  }`;

	return await client.fetch(query);
}
