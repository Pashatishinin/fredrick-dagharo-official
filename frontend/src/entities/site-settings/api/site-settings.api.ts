import groq from "groq";
import { client } from "../../../shared/client";
import { IMAGE_FRAGMENT, LINK_FRAGMENT, SEO_FRAGMENT } from "../../lib/fragments";
import type { SiteSettingsData } from "../model/site-settings.types";

export async function getSiteSettings(): Promise<SiteSettingsData | null> {
	const query = groq`*[_type == "siteSettings"][0] {
    logo,
    logoImage { ${IMAGE_FRAGMENT} },
    footer {
      backgroundVimeoId,
      social[] { ${LINK_FRAGMENT} }
    },
    seo { ${SEO_FRAGMENT} }
  }`;

	return await client.fetch(query);
}
