/** Сырой синглтон `contacts` из Sanity — значения ровно как их ввёл редактор. */
export interface ContactsData {
	whatsapp?: string;
	phone?: string;
	email?: string;
}

export type ContactKind = "whatsapp" | "phone" | "email";

/** Одна готовая к отрисовке строка: подпись, видимый текст и ссылка. */
export interface ContactLink {
	kind: ContactKind;
	label: string;
	value: string;
	href: string;
	/** WhatsApp открывается на wa.me — в новой вкладке, остальные — системой. */
	external: boolean;
}

/** Пустые поля уже отброшены: в вёрстку попадает только то, что заполнено. */
export interface Contacts {
	links: ContactLink[];
}
