import * as api from "./api";
import * as mappers from "./types/base.mappers";

export const fetchHomeData = async () => {
	const [preloaderData, transitionLoaderData, projects, categories] = await Promise.all([
		api.getPreLoader(),
		api.getTransitionLoader(),
		api.getProjects(),
		api.getCategories(),
	]);

	return {
		projects: projects.map((project) => mappers.mapProjectsWithUrls(project)),
		categories,
		preloader: mappers.mapGif(preloaderData?.preLoader),
		transitionLoader: mappers.mapGif(transitionLoaderData?.transitionLoader),
	};
};
