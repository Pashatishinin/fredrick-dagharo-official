import * as mappers from "../model/photography.mappers";
import type { Photography } from "../model/photography.types";
import * as api from "./photography.api";

export const fetchPhotographyData = async (): Promise<Photography> => {
	const photography = await api.getPhotography();
	return mappers.mapPhotography(photography);
};
