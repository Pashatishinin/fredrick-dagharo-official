import { AsteriskIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

/**
 * The intro animation shown once per visit, before the first page appears.
 * Singleton. Without a GIF there is no intro at all — the page shows at once.
 */
export const loader = defineType({
	name: "siteLoader",
	title: "Site Loader",
	type: "document",
	icon: AsteriskIcon,

	fields: [
		defineField({
			name: "preLoader",
			title: "Loader (GIF)",
			type: "image",
			description:
				"Shown full screen once per visit. Served as-is, never re-encoded — keep the " +
				"file small, it is the first thing the visitor downloads",
			options: { accept: ".gif" },
		}),
		defineField({
			name: "duration",
			title: "Duration (seconds)",
			type: "number",
			description: "How long the loader stays on screen before it fades out. Empty — 2.5 seconds",
			validation: (Rule) => Rule.min(0.5).max(10),
		}),
	],

	preview: {
		select: { media: "preLoader" },
		prepare: ({ media }) => ({ title: "Site Loader", media }),
	},
});
