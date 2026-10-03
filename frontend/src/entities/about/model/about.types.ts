import type { Image, RawImage, Seo, SeoData } from "../../lib/base.types";

/** Сырой документ `about` из Sanity. */
export interface AboutData {
	/** Переносы строк расставляет редактор — по ним текст бьётся на блоки. */
	mark?: string;
	bio?: string;
	services?: string[];
	clients?: string[];
	showreel?: {
		vimeoId?: string;
		title?: string;
	};
	portrait?: RawImage | null;
	/** Второй кадр проявляется плитками при наведении. */
	portraitHover?: RawImage | null;
	seo?: SeoData | null;
}

export interface AboutShowreel {
	vimeoId: string;
	title: string;
}

/**
 * То, что уходит в вёрстку: картинки уже развёрнуты в url + размеры.
 * Запасных значений нет — пустое поле значит, что блок не выводится.
 */
export interface About {
	/** Уже разбит по переносам: каждая строка — отдельный блок в макете. */
	mark: string[];
	bio: string;
	services: string[];
	clients: string[];
	showreel: AboutShowreel;
	portrait: Image;
	portraitHover: Image;
	seo: Seo;
}
