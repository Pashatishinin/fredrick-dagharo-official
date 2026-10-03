import { ImagesIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

/** How many array slots we probe to show a photo count in the studio list. */
const PREVIEW_LIMIT = 20;

/**
 * A photography set. The /photography page flattens the `photos` of every
 * set into one gallery, in the order the sets were created. The title is
 * only for finding a set in the studio list.
 *
 * Image dimensions are never typed in by hand: Sanity measures each asset
 * on upload and stores the result in metadata.dimensions, and the front
 * end reads the aspect ratio from there.
 */
export const photography = defineType({
	name: "photography",
	title: "Photography",
	type: "document",
	icon: ImagesIcon,
	fields: [
		defineField({
			name: "photos",
			title: "Photos",
			type: "array",
			description:
				"Order here is the order in both the grid and the slider. " +
				"Any aspect ratio works — the layout adapts to each frame",
			of: [
				{
					type: "image",
					options: { hotspot: true },
					fields: [
						defineField({
							name: "alt",
							type: "string",
							title: "Alt text (SEO)",
							description: "Describe what is in the frame",
							validation: (Rule) => Rule.required().error("Alt text is required for SEO"),
						}),
					],
				},
			],
			options: { layout: "grid" },
		}),

		defineField({
			name: "title",
			title: "Title",
			type: "string",
			description: "Only used in the studio list",
		}),
	],

	preview: {
		/**
		 * preview.select cannot return a whole array — Sanity only resolves
		 * dot-paths to single values, so selecting `photos` gives nothing back.
		 * To count them we probe slots by index and pick the cheapest value in
		 * each one (`_key`, a short string). Past the limit the count is shown
		 * as "20+" rather than a wrong number.
		 */
		select: {
			title: "title",
			media: "photos.0.asset",
			...Object.fromEntries(
				Array.from({ length: PREVIEW_LIMIT }, (_, i) => [`photo${i}`, `photos.${i}._key`]),
			),
		},
		prepare: (selection: Record<string, unknown>) => {
			const filled = Array.from({ length: PREVIEW_LIMIT }).filter(
				(_, i) => selection[`photo${i}`],
			).length;

			const count = filled === 0 ? "No photos" : filled === 1 ? "1 photo" : `${filled} photos`;

			return {
				title: (selection.title as string) || "Untitled set",
				subtitle: filled === PREVIEW_LIMIT ? `${PREVIEW_LIMIT}+ photos` : count,
				media: selection.media as never,
			};
		},
	},
});
