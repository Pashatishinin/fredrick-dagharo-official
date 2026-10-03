import { ImagesIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

/**
 * The /photography page. Singleton.
 *
 * The gallery itself is not edited here: it shows the photos of every
 * Photography set. This document only holds what belongs to the page.
 */
export const photographyPage = defineType({
	name: "photographyPage",
	title: "Photography page",
	type: "document",
	icon: ImagesIcon,

	fields: [defineField({ name: "seo", title: "SEO", type: "seo" })],

	preview: {
		prepare: () => ({ title: "Photography page" }),
	},
});
