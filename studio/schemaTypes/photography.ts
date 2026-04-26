import { ImagesIcon, ListIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const photography = defineType({
	name: "photography",
	title: "Photography",
	type: "document",
	icon: ImagesIcon,
	groups: [
		{ name: "media", title: "Media Files" },
		{ name: "content", title: "Content" },
	],
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
		}),

		defineField({
			name: "cover",
			type: "image",
			options: {
				hotspot: true,
			},
			title: "Cover",
			group: "media",
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "title",
				maxLength: 96,
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "year",
			title: "Year",
			type: "string",
		}),
		defineField({
			name: "info",
			title: "Info",
			type: "text",
		}),

		defineField({
			name: "contentBlocks",
			title: "Content Blocks",
			type: "array",
			group: "content",
			of: [
				{
					name: "textAndPhotos",
					type: "object",
					title: "Text and Photos Group",
					fields: [
						{
							name: "groupText",
							title: "Text Content",
							type: "text",
						},

						{
							name: "groupImages",
							title: "Images",
							type: "array",
							of: [
								{
									type: "image",
									options: { hotspot: true },
									fields: [{ name: "alt", type: "string", title: "Alt text" }],
								},
							],
							options: {
								layout: "grid",
							},
						},
					],

					preview: {
						select: {
							title: "groupText",
							media: "groupImages.0.asset",
						},
						prepare(selection) {
							const { title, media } = selection;
							return {
								title: title || "Empty text",
								subtitle: "Group with text and photos",
								media: media,
							};
						},
					},
				},
			],
		}),
	],
});
