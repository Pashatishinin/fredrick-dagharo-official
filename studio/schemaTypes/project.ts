import { VideoIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const project = defineType({
	name: "project",
	title: "Project",
	type: "document",

	icon: VideoIcon,
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			validation: (Rule) => Rule.max(50).error("Title is too long"),
		}),
		defineField({
			name: "subTitle",
			title: "Sub Title",
			type: "string",
			validation: (Rule) => Rule.max(100).error("Title is too long"),
		}),
		defineField({
			name: "img",
			type: "image",
			options: {
				hotspot: true,
			},
			title: "Картинка",
		}),
		defineField({
			name: "isBig",
			title: "Featured (Big)",
			type: "boolean",
			initialValue: false,
			description: "If enabled, this project will take more space on the home page",
		}),

		defineField({
			name: "gifImage",
			type: "image",
			title: "GIF Animation",
			description: "Upload a file in .gif format",
			options: {
				accept: ".gif",
			},
		}),
		defineField({
			name: "videoUrl",
			type: "url",
			title: "Video Link",
			description: "Paste a link to YouTube or Vimeo",
			validation: (Rule) =>
				Rule.uri({
					scheme: ["http", "https"],
				}),
		}),
		defineField({
			name: "description",
			title: "Description",
			type: "array",
			of: [
				defineField({
					name: "desc",
					title: "Description",
					type: "text",
					validation: (Rule) => Rule.max(450).error("The text cannot exceed 450 characters"),
				}),
			],
		}),
		defineField({
			name: "date",
			title: "Date (Year)",
			type: "string",
			placeholder: "2026",
		}),
		defineField({
			name: "categories",
			title: "Categories",
			type: "array",
			of: [{ type: "reference", to: [{ type: "category" }] }],
		}),
	],
	preview: {
		select: {
			title: "title",
			isBig: "isBig",
			media: "img",
		},
		prepare({ title, isBig, media }) {
			return {
				title: title || "Untitled",
				subtitle: isBig ? "⭐ Featured / Big Card" : "Standard Card",
				media: media,
			};
		},
	},
});
