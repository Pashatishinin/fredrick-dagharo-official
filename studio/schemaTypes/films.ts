import { VideoIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

/**
 * A film. One document surfaces in three different places, so the fields are
 * grouped by where the editor will see the result:
 *
 *   Hero  — first screen of the project page: full-screen title, cover pulled
 *           from Vimeo, click opens a modal with the player.
 *   Info  — the table below the hero: description plus Client / Role / Year /
 *           Location.
 *   Card  — the card in the home gallery, in the archive, and in the
 *           previous / next block at the bottom of a project page.
 *   SEO   — optional overrides for the project page title and description.
 *
 * A field that is rendered nowhere does not belong in here.
 */
export const films = defineType({
	name: "films",
	title: "Films",
	type: "document",
	icon: VideoIcon,
	groups: [
		{ name: "hero", title: "Hero", default: true },
		{ name: "info", title: "Info" },
		{ name: "card", title: "Card" },
		{ name: "seo", title: "SEO" },
	],

	fields: [
		// ---- Hero ----

		defineField({
			name: "title",
			title: "Title",
			type: "string",
			description: "Full-screen heading in the hero and the small caption above the Info table",
			group: "hero",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			description: "Page address: /projects/<slug>",
			group: "hero",
			options: { source: "title", maxLength: 96 },
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "urlVimeo",
			title: "Vimeo ID",
			type: "string",
			description:
				"Video number only, without the URL. Both the hero cover and the modal " +
				"player come from it — without it the first screen stays empty",
			group: "hero",
			validation: (Rule) => Rule.required(),
		}),

		// ---- Info ----

		defineField({
			name: "info",
			title: "Description",
			type: "text",
			rows: 5,
			description: "The main copy of the Info section — the large paragraph on the left",
			group: "info",
		}),
		defineField({
			name: "client",
			title: "Client",
			type: "string",
			description: "First row of the facts table",
			group: "info",
		}),
		defineField({
			name: "role",
			title: "Role",
			type: "string",
			description: "Role on the project, for example “Director / DoP”",
			group: "info",
		}),
		defineField({
			name: "year",
			title: "Year",
			type: "string",
			description: "Also drives the ordering of films in the archive and the gallery",
			group: "info",
		}),
		defineField({
			name: "city",
			title: "Location",
			type: "string",
			description: "A city, or several separated by commas",
			group: "info",
		}),

		// ---- Card ----

		defineField({
			name: "gif",
			title: "Hover preview",
			type: "image",
			description:
				"Short GIF that fades in over the cover when the card is hovered. " +
				"Served as-is, never re-encoded",
			group: "card",
			options: { hotspot: true },
			fields: [
				defineField({
					name: "alt",
					type: "string",
					title: "Alt text (SEO)",
				}),
			],
		}),
		defineField({
			name: "isSelected",
			title: "Selected Film",
			type: "boolean",
			description: "Show in the home gallery. The archive lists every film regardless",
			group: "card",
			initialValue: false,
		}),
		defineField({
			name: "isBig",
			title: "Bigger place",
			type: "boolean",
			description:
				"The card takes up more room in the gallery. On phones, where cards " +
				"stack in one column, every card is the same size",
			group: "card",
			initialValue: false,
		}),

		// ---- SEO ----

		defineField({
			name: "seo",
			title: "SEO",
			type: "seo",
			group: "seo",
			description:
				"Optional. Empty fields fall back to the film title and the start of " + "the description",
		}),
	],

	preview: {
		select: {
			title: "title",
			year: "year",
			client: "client",
			media: "gif",
			isSelected: "isSelected",
			isBig: "isBig",
		},
		// Both flags decide how the card behaves in the gallery, so they belong
		// in the list itself — otherwise every film has to be opened to tell
		// which ones are on the home page.
		prepare: ({ title, year, client, media, isSelected, isBig }) => {
			const flags = [isSelected && "★ Selected", isBig && "◼ Big"].filter(Boolean);

			return {
				title: title || "Untitled",
				subtitle: [client, year, ...flags].filter(Boolean).join(" · "),
				media,
			};
		},
	},
});
