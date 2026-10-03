import * as mappers from "../model/loader.mappers";
import type { Loader } from "../model/loader.types";
import * as api from "./loader.api";

const load = async (): Promise<Loader> => mappers.mapLoader(await api.getSiteLoader());

let cached: Promise<Loader> | null = null;

/**
 * Лоадер стоит в MainLayout, то есть на каждой странице. На сборке
 * запрашиваем его один раз на весь сайт; в dev — каждый раз заново,
 * чтобы правки в студии были видны после обновления.
 */
export const fetchLoaderData = (): Promise<Loader> => {
	if (import.meta.env.DEV) return load();

	cached ??= load();
	return cached;
};
