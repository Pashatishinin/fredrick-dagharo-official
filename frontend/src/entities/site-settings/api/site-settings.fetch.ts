import * as mappers from "../model/site-settings.mappers";
import type { SiteSettings } from "../model/site-settings.types";
import * as api from "./site-settings.api";

const load = async (): Promise<SiteSettings> =>
	mappers.mapSiteSettings(await api.getSiteSettings());

let cached: Promise<SiteSettings> | null = null;

/**
 * Настройки нужны на каждой странице сразу трём местам: MainLayout, шапке
 * и футеру. На сборке запрашиваем их один раз на весь сайт, а не трижды
 * на страницу. В dev кэша нет — правки в студии видны после обновления.
 */
export const fetchSiteSettings = (): Promise<SiteSettings> => {
	if (import.meta.env.DEV) return load();

	cached ??= load();
	return cached;
};
