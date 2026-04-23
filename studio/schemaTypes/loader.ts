import { AsteriskIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const loader = defineType({
	name: "siteLoader",
	title: "Site Loaders",
	type: "document",
	icon: AsteriskIcon,
	fields: [
		defineField({
			name: "preLoader",
			type: "image",
			title: "Initial Site Loader (GIF)",
			description: "Shown once when the site is first loaded.",
			options: {
				accept: ".gif",
			},
		}),
		defineField({
			name: "transitionLoader",
			type: "image",
			title: "Page Transition Loader (GIF)",
			description: "Shown when switching between pages",
			options: {
				accept: ".gif",
			},
		}),
	],
});
