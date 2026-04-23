import { createClient } from "@sanity/client";

export const client = createClient({
	projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
	dataset: import.meta.env.PUBLIC_SANITY_DATASET,
	apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION || "2024-03-27",
	useCdn: false,
});
