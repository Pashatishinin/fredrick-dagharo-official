import { LinkIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

/**
 * An outgoing link: a social profile, an email. Internal navigation is not
 * edited in the studio — see siteSettings.
 */
export const link = defineType({
	name: "link",
	title: "Link",
	type: "object",
	icon: LinkIcon,
	fields: [
		defineField({
			name: "label",
			title: "Label",
			type: "string",
			description: "Rendered in uppercase on the site, so casing here does not matter",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "url",
			title: "URL",
			type: "url",
			description: "Full address: https://… or mailto:…",
			validation: (Rule) => Rule.required().uri({ scheme: ["http", "https", "mailto"] }),
		}),
	],
	preview: {
		select: { title: "label", subtitle: "url" },
	},
});
