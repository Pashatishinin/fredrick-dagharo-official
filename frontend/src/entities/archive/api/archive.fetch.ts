import * as mappers from "../model/archive.mappers";
import type { Archive } from "../model/archive.types";
import * as api from "./archive.api";

export const fetchArchiveData = async (): Promise<Archive> => {
	const archive = await api.getArchive();
	return mappers.mapArchive(archive);
};
