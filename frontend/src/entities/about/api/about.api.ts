import groq from "groq";
import { client } from "../../../shared/client";
import { IMAGE_FRAGMENT, SEO_FRAGMENT } from "../../lib/fragments";
import type { AboutData } from "../model/about.types";

/** Страница About — синглтон, поэтому берём первый документ. */
export async function getAbout(): Promise<AboutData | null> {
	const query = groq`*[_type == "about"][0] {
    mark,
    bio,
    services,
    clients,
    showreel { vimeoId, title },
    portrait { ${IMAGE_FRAGMENT} },
    portraitHover { ${IMAGE_FRAGMENT} },
    seo { ${SEO_FRAGMENT} }
  }`;

	return await client.fetch(query);
}
