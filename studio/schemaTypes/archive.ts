import { ArchiveIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

/**
 * The archive page (/index). Singleton.
 *
 * The list itself is not edited here: it shows every published film with a
 * slug, newest first. This document only holds what belongs to the page.
 */
export const archive = defineType({
	name: "archive",
	title: "Archive",
	type: "document",
	icon: ArchiveIcon,

	fields: [defineField({ name: "seo", title: "SEO", type: "seo" })],

	preview: {
		prepare: () => ({ title: "Archive" }),
	},
});
