import groq from "groq";
import { client } from "../../../shared/client";
import { FILM_FRAGMENT, SEO_FRAGMENT } from "../../lib/fragments";
import type { ArchiveData } from "../model/archive.types";

/**
 * Всё для архива одним запросом: SEO из синглтона Archive и все фильмы.
 * Фильм без слага пропускаем — строка вела бы на несуществующую страницу.
 */
export async function getArchive(): Promise<ArchiveData> {
	const query = groq`{
    "seo": *[_type == "archive"][0].seo { ${SEO_FRAGMENT} },
    "films": *[_type == "films" && defined(slug.current)] | order(year desc, title asc) {
      ${FILM_FRAGMENT}
    }
  }`;

	return await client.fetch(query);
}
