import groq from "groq";
import { client } from "../../../shared/client";
import { IMAGE_FRAGMENT } from "../../lib/fragments";
import type { LoaderData } from "../model/loader.types";

export async function getSiteLoader(): Promise<LoaderData | null> {
	const query = groq`*[_type == "siteLoader"][0] {
    preLoader { ${IMAGE_FRAGMENT} },
    duration
  }`;

	return await client.fetch(query);
}
