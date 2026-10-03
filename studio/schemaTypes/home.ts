import { HomeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

/**
 * The home page. Singleton.
 *
 * The gallery itself is not edited here: it lists every film marked
 * “Selected Film” in Films, newest first. This document only holds what
 * belongs to the page as a whole.
 */
export const home = defineType({
	name: "home",
	title: "Home",
	type: "document",
	icon: HomeIcon,

	fields: [defineField({ name: "seo", title: "SEO", type: "seo" })],

	preview: {
		prepare: () => ({ title: "Home" }),
	},
});
