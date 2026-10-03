import { mapFilms } from "../../film/model/film.mappers";
import type { ProjectPage } from "../model/project.types";
import * as api from "./project.api";

/**
 * Все страницы проектов разом — в таком виде их ждёт getStaticPaths.
 *
 * Соседей считаем здесь, а не отдельными запросами на каждую страницу:
 * список всё равно нужен целиком, чтобы знать порядок. Кольцо замыкается,
 * поэтому у последнего проекта «следующий» — первый.
 */
export const fetchProjectPages = async (): Promise<ProjectPage[]> => {
	const films = await mapFilms(await api.getProjectFilms());

	return films.map((project, index) => ({
		project,
		previous: films[(index - 1 + films.length) % films.length],
		next: films[(index + 1) % films.length],
	}));
};
