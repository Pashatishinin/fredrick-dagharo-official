import { mapFilms } from "../../film/model/film.mappers";
import { mapSeo } from "../../lib/seo.mappers";
import type { Archive, ArchiveData } from "./archive.types";

export const mapArchive = async (archive: ArchiveData | null | undefined): Promise<Archive> => ({
	seo: mapSeo(archive?.seo),
	films: await mapFilms(archive?.films),
});
