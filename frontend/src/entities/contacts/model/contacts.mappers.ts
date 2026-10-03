import type { ContactLink, Contacts, ContactsData } from "./contacts.types";

/** Только цифры — так номер понимают и wa.me, и tel:. */
const digitsOf = (value: string) => value.replace(/\D/g, "");

/**
 * Ссылки собираются здесь, а не в студии: редактор вводит номер или адрес
 * в привычном виде, с пробелами и скобками, и на сайте он показывается
 * ровно так же, а в href уходит нормализованная версия.
 */
const toLink = (kind: ContactLink["kind"], raw: string | undefined): ContactLink | null => {
	const value = raw?.trim();
	if (!value) return null;

	switch (kind) {
		case "whatsapp": {
			const digits = digitsOf(value);
			if (!digits) return null;
			return { kind, label: "WhatsApp", value, href: `https://wa.me/${digits}`, external: true };
		}
		case "phone": {
			const digits = digitsOf(value);
			if (!digits) return null;
			// Плюс сохраняем: без него номер наберётся как местный.
			const prefix = value.startsWith("+") ? "+" : "";
			return { kind, label: "Phone", value, href: `tel:${prefix}${digits}`, external: false };
		}
		case "email":
			return { kind, label: "Email", value, href: `mailto:${value}`, external: false };
	}
};

const isLink = (link: ContactLink | null): link is ContactLink => link !== null;

export const mapContacts = (contacts: ContactsData | null | undefined): Contacts => ({
	links: [
		toLink("whatsapp", contacts?.whatsapp),
		toLink("phone", contacts?.phone),
		toLink("email", contacts?.email),
	].filter(isLink),
});
