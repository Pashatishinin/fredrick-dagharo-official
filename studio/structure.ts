import { AsteriskIcon, ImagesIcon, ListIcon, UlistIcon, VideoIcon } from "@sanity/icons";
import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
	S.list()
		.title("Контент")
		.items([
			S.listItem()
				.title("Categorie")
				.icon(VideoIcon)
				.child(() => S.documentTypeList("category").title("Categorie")),
			S.divider(),
			S.listItem()
				.title("Films")
				.icon(VideoIcon)
				.child(() => S.documentTypeList("films").title("Films")),
			S.listItem()
				.title("Categories for Films")
				.icon(UlistIcon)
				.child(
					S.documentTypeList("category")
						.title("Topics for Films")
						.filter('_type == "category" && type == "films"')
						.initialValueTemplates([S.initialValueTemplateItem("category", { type: "films" })]),
				),
			S.divider(),
			S.listItem()
				.title("Photography")
				.icon(ImagesIcon)
				.child(() => S.documentTypeList("photography").title("Photography")),

			S.listItem()
				.title("Categories for Photography")
				.icon(UlistIcon)
				.child(
					S.documentTypeList("category")
						.title("Topics for Photography")
						.filter('_type == "category" && type == "photography"')
						.initialValueTemplates([
							S.initialValueTemplateItem("category", { type: "photography" }),
						]),
				),
			S.divider(),
			S.listItem()
				.title("Site Loaders")
				.icon(AsteriskIcon)
				.child(S.document().schemaType("siteLoader").documentId("loader")),
		]);
