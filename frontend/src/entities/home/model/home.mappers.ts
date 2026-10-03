import { mapFilms } from "../../film/model/film.mappers";
import { mapSeo } from "../../lib/seo.mappers";
import type { Home, HomeData } from "./home.types";

export const mapHome = async (home: HomeData | null | undefined): Promise<Home> => ({
	seo: mapSeo(home?.seo),
	films: await mapFilms(home?.films),
});
