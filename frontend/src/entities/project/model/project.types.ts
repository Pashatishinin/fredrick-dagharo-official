import type { Film } from "../../film/model/film.types";

/**
 * Всё для одной страницы проекта. Сам проект — тот же фильм, что
 * в галерее; соседи рисуются той же карточкой.
 */
export interface ProjectPage {
	project: Film;
	previous: Film;
	next: Film;
}
