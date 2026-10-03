import type { Image, Link, RawImage, Seo, SeoData } from "../../lib/base.types";

/** Сырой синглтон `siteSettings` из Sanity. */
export interface SiteSettingsData {
	/** Переносы строк расставляет редактор — логотип набран в две строки. */
	logo?: string;
	logoImage?: RawImage | null;
	footer?: {
		social?: Link[];
		/** Декоративный фон подвала — номер ролика на Vimeo. */
		backgroundVimeoId?: string;
	} | null;
	seo?: SeoData | null;
}

export interface SiteFooter {
	social: Link[];
	/** Пустая строка — футер без видео. */
	backgroundVimeoId: string;
}

/** Пустые значения — блок не выводится; запасных данных в коде нет. */
export interface SiteSettings {
	/** Уже разбит по переносам: каждая строка — отдельная строка логотипа. */
	logo: string[];
	/** Картинка-логотип. url === null — показываем текстовый логотип. */
	logoImage: Image;
	footer: SiteFooter;
	/** SEO по умолчанию: title — суффикс заголовков, description — для страниц без своего. */
	seo: Seo;
}
