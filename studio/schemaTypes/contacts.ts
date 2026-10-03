import { EnvelopeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

/** Digits, spaces, brackets and dashes, optionally led by a plus. */
const PHONE_PATTERN = /^\+?[\d\s()-]{7,}$/;

const validatePhone = (value: string | undefined) =>
	!value || PHONE_PATTERN.test(value.trim()) || "Use digits only, e.g. +49 151 2345 6789";

/**
 * Contacts shown at the bottom of the About page. Singleton.
 *
 * Every field is optional: an empty one is simply not rendered, and the
 * whole block disappears when all three are empty. Links are built on the
 * site from the raw values, so editors type a number or an address, never
 * a URL.
 */
export const contacts = defineType({
	name: "contacts",
	title: "Contacts",
	type: "document",
	icon: EnvelopeIcon,

	fields: [
		defineField({
			name: "whatsapp",
			title: "WhatsApp",
			type: "string",
			description:
				"Number in international format with the country code, e.g. +49 151 2345 6789. " +
				"Opens a chat on wa.me",
			validation: (Rule) => Rule.custom(validatePhone),
		}),
		defineField({
			name: "phone",
			title: "Phone",
			type: "string",
			description: "Shown exactly as typed. Include the country code so the link works from abroad",
			validation: (Rule) => Rule.custom(validatePhone),
		}),
		defineField({
			name: "email",
			title: "Email",
			type: "string",
			validation: (Rule) => Rule.email(),
		}),
	],

	preview: {
		select: { email: "email", phone: "phone", whatsapp: "whatsapp" },
		prepare: ({ email, phone, whatsapp }) => ({
			title: "Contacts",
			subtitle: [email, phone || whatsapp].filter(Boolean).join(" · ") || "Empty",
		}),
	},
});
