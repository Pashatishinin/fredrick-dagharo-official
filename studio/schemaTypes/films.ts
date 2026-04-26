import { ListIcon, VideoIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const films = defineType({
	name: "films",
	title: "Films",
	type: "document",
	icon: VideoIcon,
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
			name: "gif",
			type: "image",
			options: {
				hotspot: true,
			},
			title: "Short Video",
			group: "media",
		}),

		defineField({
			name: "urlVimeo",
			title: "Number of video on Vimeo",
			type: "string",
			group: "media",
		}),

		defineField({
			name: "isBig",
			title: "Bigger place",
			type: "boolean",
			description: "Turn on for project that should take more space in main gallery",
			initialValue: false,
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
