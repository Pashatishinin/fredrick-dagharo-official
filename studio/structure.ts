import {
	ArchiveIcon,
	AsteriskIcon,
	CogIcon,
	EnvelopeIcon,
	HomeIcon,
	ImagesIcon,
	UserIcon,
	VideoIcon,
} from "@sanity/icons";
import type { StructureResolver } from "sanity/structure";

/**
 * Singletons open straight into a document with a fixed id, so the editor
 * cannot accidentally create a second About or a second gallery.
 */
export const structure: StructureResolver = (S) =>
	S.list()
		.title("Content")
		.items([
			S.listItem()
				.title("Home")
				.icon(HomeIcon)
				.child(S.document().schemaType("home").documentId("home")),
			S.listItem()
				.title("Archive")
				.icon(ArchiveIcon)
				.child(S.document().schemaType("archive").documentId("archive")),
			S.divider(),

			S.listItem()
				.title("Films")
				.icon(VideoIcon)
				.child(() => S.documentTypeList("films").title("Films")),
			S.divider(),

			// The page and its photo sets live in one folder.
			S.listItem()
				.title("Photography")
				.icon(ImagesIcon)
				.child(
					S.list()
						.title("Photography")
						.items([
							S.listItem()
								.title("Page")
								.child(S.document().schemaType("photographyPage").documentId("photographyPage")),
							S.listItem().title("Sets").child(S.documentTypeList("photography").title("Sets")),
						]),
				),
			S.divider(),

			S.listItem()
				.title("About")
				.icon(UserIcon)
				.child(S.document().schemaType("about").documentId("about")),
			S.listItem()
				.title("Contacts")
				.icon(EnvelopeIcon)
				.child(S.document().schemaType("contacts").documentId("contacts")),
			S.divider(),

			S.listItem()
				.title("Site Settings")
				.icon(CogIcon)
				.child(S.document().schemaType("siteSettings").documentId("siteSettings")),
			S.listItem()
				.title("Site Loader")
				.icon(AsteriskIcon)
				.child(S.document().schemaType("siteLoader").documentId("loader")),
		]);
