import groq from "groq";
import { client } from "../../../shared/client";
import { FILM_FRAGMENT, SEO_FRAGMENT } from "../../lib/fragments";
import type { HomeData } from "../model/home.types";

/**
 * Всё для главной одним запросом: SEO из синглтона Home и фильмы,
 * отмеченные «Selected Film». Фильм без слага пропускаем — карточка
 * вела бы на несуществующую страницу.
 */
export async function getHome(): Promise<HomeData> {
	const query = groq`{
    "seo": *[_type == "home"][0].seo { ${SEO_FRAGMENT} },
    "films": *[_type == "films" && isSelected == true && defined(slug.current)] | order(year desc) {
      ${FILM_FRAGMENT}
    }
  }`;

	return await client.fetch(query);
}
