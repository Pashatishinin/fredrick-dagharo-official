import { defineField } from "sanity";

interface ImageWithAltOptions {
	name: string;
	title: string;
	description?: string;
	group?: string;
	/** Alt is required for meaningful images and optional for decorative ones. */
	altRequired?: boolean;
}

/** An image field with hotspot and its own alt text. */
export const imageWithAlt = ({
	name,
	title,
	description,
	group,
	altRequired = false,
}: ImageWithAltOptions) =>
	defineField({
		name,
		title,
		type: "image",
		description,
		group,
		options: { hotspot: true },
		fields: [
			defineField({
				name: "alt",
				type: "string",
				title: "Alt text (SEO)",
				description: "Describe what is in the frame for screen readers and search engines",
				validation: (Rule) =>
					altRequired ? Rule.required().error("Alt text is required for SEO") : Rule,
			}),
		],
	});
