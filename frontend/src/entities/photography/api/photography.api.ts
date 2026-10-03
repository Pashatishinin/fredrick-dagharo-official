import groq from "groq";
import { client } from "../../../shared/client";
import { IMAGE_FRAGMENT, SEO_FRAGMENT } from "../../lib/fragments";
import type { PhotographyData } from "../model/photography.types";

/**
 * Всё для /photography одним запросом: SEO из синглтона Photography page
 * и снимки всех наборов. Порядок наборов — по дате создания документа:
 * он стабилен и не зависит от необязательных полей.
 */
export async function getPhotography(): Promise<PhotographyData> {
	const query = groq`{
    "seo": *[_type == "photographyPage"][0].seo { ${SEO_FRAGMENT} },
    "sets": *[_type == "photography"] | order(_createdAt asc) {
      photos[] { ${IMAGE_FRAGMENT} }
    }
  }`;

	return await client.fetch(query);
}
