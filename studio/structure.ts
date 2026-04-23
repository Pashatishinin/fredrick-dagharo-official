import { AsteriskIcon, ListIcon, VideoIcon } from "@sanity/icons";
import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
	S.list()
		.title("Контент")
		.items([
			S.listItem()
				.title("Projects")
				.icon(VideoIcon)
				.child(() => S.documentTypeList("project").title("Project")),
			S.listItem()
				.title("Categories")
				.icon(ListIcon)
				.child(() => S.documentTypeList("category").title("Category")),
			S.divider(),
			S.listItem()
				.title("Site Loaders")
				.icon(AsteriskIcon)
				.child(S.document().schemaType("siteLoader").documentId("loader")),
		]);
