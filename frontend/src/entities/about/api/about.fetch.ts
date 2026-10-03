import * as mappers from "../model/about.mappers";
import type { About } from "../model/about.types";
import * as api from "./about.api";

export const fetchAboutData = async (): Promise<About> => {
	const about = await api.getAbout();
	return mappers.mapAbout(about);
};
