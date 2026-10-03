import { mapImage } from "../../lib/image.mappers";
import { mapSeo } from "../../lib/seo.mappers";
import { splitLines } from "../../lib/text.mappers";
import type { About, AboutData } from "./about.types";

const PORTRAIT_WIDTH = 1200;

const trimmed = (value: string | undefined | null) => value?.trim() ?? "";

/** Пустые строки в списках редактор оставляет случайно — на странице они не нужны. */
const cleanList = (list: string[] | undefined | null) => (list ?? []).map(trimmed).filter(Boolean);

export const mapAbout = (about: AboutData | null | undefined): About => ({
	mark: splitLines(about?.mark),
	bio: trimmed(about?.bio),
	services: cleanList(about?.services),
	clients: cleanList(about?.clients),
	showreel: {
		vimeoId: trimmed(about?.showreel?.vimeoId),
		title: trimmed(about?.showreel?.title),
	},
	portrait: mapImage(about?.portrait, PORTRAIT_WIDTH),
	portraitHover: mapImage(about?.portraitHover, PORTRAIT_WIDTH),
	seo: mapSeo(about?.seo),
});
