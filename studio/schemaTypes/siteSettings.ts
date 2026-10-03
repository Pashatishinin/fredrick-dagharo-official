import { CogIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

/**
 * Site-wide settings. Singleton.
 *
 * Everything that appears on every page lives here: the logo, the default
 * SEO and the footer. The exceptions are navigation and the footer column
 * headings — the header menu and the footer sitemap point at routes that
 * exist as files in the code, so a URL edited here could only break a link.
 */
export const siteSettings = defineType({
	name: "siteSettings",
	title: "Site Settings",
	type: "document",
	icon: CogIcon,
	groups: [
		{ name: "brand", title: "Brand", default: true },
		{ name: "footer", title: "Footer" },
		{ name: "seo", title: "SEO" },
	],

	fields: [
		defineField({
			name: "logo",
			title: "Logo",
			type: "text",
			rows: 2,
			group: "brand",
			description:
				"The name in the header and the footer. Press Enter where the line should " +
				"break — the logo is set in two lines",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "logoImage",
			title: "Logo image",
			type: "image",
			group: "brand",
			description:
				"Optional. When set, it replaces the text logo in the header and the footer; " +
				"the text above is still used as its accessible name. Use a white logo on a " +
				"transparent background (SVG or PNG): the header inverts itself over the page",
			options: { accept: "image/svg+xml,image/png,image/webp" },
		}),

		defineField({
			name: "footer",
			title: "Footer",
			type: "object",
			group: "footer",
			fields: [
				defineField({
					name: "social",
					title: "Social links",
					type: "array",
					of: [{ type: "link" }],
				}),
				defineField({
					name: "backgroundVimeoId",
					title: "Background video (Vimeo ID)",
					type: "string",
					description:
						"Video number only. Decorative footer background, loaded last and only " +
						"on screens wider than a phone. Leave empty for a plain footer",
				}),
			],
		}),

		defineField({
			name: "seo",
			title: "Default SEO",
			type: "seo",
			group: "seo",
			description:
				"The title is added after every page title (“About — <title>”) and used " +
				"alone on pages without one. The description is used on pages without " +
				"their own",
		}),
	],

	preview: {
		prepare: () => ({ title: "Site Settings" }),
	},
});
