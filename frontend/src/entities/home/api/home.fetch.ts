import * as mappers from "../model/home.mappers";
import type { Home } from "../model/home.types";
import * as api from "./home.api";

export const fetchHomeData = async (): Promise<Home> => {
	const home = await api.getHome();
	return mappers.mapHome(home);
};
