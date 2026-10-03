import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { imageWithAlt } from "./helpers/imageWithAlt";

/**
 * The About page. Singleton.
 *
 * Every block on the page is rendered only when its field is filled —
 * there are no fallbacks in the code, so what is here is what the page shows.
 */
export const about = defineType({
	name: "about",
	title: "About",
	type: "document",
	icon: UserIcon,
	groups: [
		{ name: "content", title: "Content", default: true },
		{ name: "media", title: "Media" },
		{ name: "seo", title: "SEO" },
	],

	fields: [
		defineField({
			name: "mark",
			title: "Hero statement",
			type: "text",
			rows: 3,
			group: "content",
			description:
				"Press Enter to start a new line on the page. Wrapping inside a line " +
				"happens on its own, so only break where the layout should break",
		}),
		defineField({
			name: "bio",
			title: "Bio",
			type: "text",
			rows: 6,
			group: "content",
		}),
		defineField({
			name: "services",
			title: "Services",
			type: "array",
			group: "content",
			of: [{ type: "string" }],
			description:
				"Order drives the numbering: the two-column grid fills row by row, " +
				"so the left column reads 01 / 03 / 05 and the right one 02 / 04 / 06",
		}),
		defineField({
			name: "clients",
			title: "Clients",
			type: "array",
			group: "content",
			of: [{ type: "string" }],
			description: "Joined with commas into a single line on the page",
		}),

		defineField({
			name: "showreel",
			title: "Showreel",
			type: "object",
			group: "media",
			fields: [
				defineField({
					name: "vimeoId",
					title: "Vimeo ID",
					type: "string",
					description: "Video number only, without the URL",
				}),
				defineField({
					name: "title",
					title: "Title",
					type: "string",
					description: "Used as the player title, not shown on the page",
				}),
			],
		}),
		imageWithAlt({ name: "portrait", title: "Portrait", group: "media", altRequired: true }),
		imageWithAlt({
			name: "portraitHover",
			title: "Portrait on hover",
			group: "media",
			description: "Second frame, revealed tile by tile when the portrait is hovered",
		}),

		defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
	],

	preview: {
		select: { media: "portrait" },
		prepare: ({ media }) => ({ title: "About", media }),
	},
});
