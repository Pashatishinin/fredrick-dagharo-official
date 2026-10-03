/**
 * Навигация сайта — один список на шапку и карту сайта в футере,
 * поэтому они не могут разойтись. Задана в коде, а не в студии:
 * ссылки ведут на маршруты из src/pages, и адрес, изменённый в CMS,
 * просто сломал бы ссылку.
 */
export const NAVIGATION = [
	{ url: "/index", label: "ARCHIVE" },
	{ url: "/", label: "SELECTED FILMS" },
	{ url: "/about", label: "ABOUT" },
	{ url: "/photography", label: "PHOTOGRAPHY" },
];
