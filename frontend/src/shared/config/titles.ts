/**
 * Заглушки заголовков — на случай, если в студии поле SEO → Page title
 * не заполнено. Как только заголовок впишут в Sanity, заглушка перестаёт
 * использоваться: страницы берут `seo.title || заглушка`.
 *
 * У страницы проекта своей заглушки нет — её заменяет название фильма.
 */
export const PAGE_TITLES = {
	home: "Selected Works",
	archive: "Archive",
	about: "About",
	photography: "Photography",
} as const;

/** Дописывается к заголовку каждой страницы, если в Site Settings → SEO пусто. */
export const SITE_TITLE = "Fredrick Dagharo";
