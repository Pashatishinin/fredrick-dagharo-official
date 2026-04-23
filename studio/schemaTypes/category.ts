import { ListIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const category = defineType({
	name: "category",
	title: "Category",
	type: "document",
	icon: ListIcon,
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
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
	],
});
