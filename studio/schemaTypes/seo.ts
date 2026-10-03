import { SearchIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

/**
 * Page title and description for search engines and link previews.
 * An object type, so any page document can reuse it with `type: "seo"`.
 */
export const seo = defineType({
	name: "seo",
	title: "SEO",
	type: "object",
	icon: SearchIcon,
	fields: [
		defineField({
			name: "title",
			title: "Page title",
			type: "string",
			description: "Shown in the browser tab as “<title> — Fredrick Dagharo”",
			validation: (Rule) => Rule.max(60).warning("Search engines cut titles past ~60 characters"),
		}),
		defineField({
			name: "description",
			title: "Description",
			type: "text",
			rows: 3,
			description: "The snippet under the link in search results and messengers",
			validation: (Rule) =>
				Rule.max(160).warning("Search engines cut descriptions past ~160 characters"),
		}),
	],
});
