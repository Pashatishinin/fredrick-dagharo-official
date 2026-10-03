import type { Seo, SeoData } from "./base.types";

/** Пустая строка — поле не заполнено: MainLayout подставит общие значения сайта. */
export const mapSeo = (seo: SeoData | null | undefined): Seo => ({
	title: seo?.title?.trim() ?? "",
	description: seo?.description?.trim() ?? "",
});
