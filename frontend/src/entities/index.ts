// Единая точка входа в слой данных. Страницы импортируют только fetch-функции;
// api/ и model/ внутри каждого модуля — его внутренняя кухня.

export { fetchAboutData } from "./about/api/about.fetch";
export type { About, AboutData, AboutShowreel } from "./about/model/about.types";
export { fetchArchiveData } from "./archive/api/archive.fetch";
export type { Archive, ArchiveData } from "./archive/model/archive.types";
export { fetchContactsData } from "./contacts/api/contacts.fetch";
export type {
	ContactKind,
	ContactLink,
	Contacts,
	ContactsData,
} from "./contacts/model/contacts.types";
export type { Film, FilmData } from "./film/model/film.types";
export { fetchHomeData } from "./home/api/home.fetch";
export type { Home, HomeData } from "./home/model/home.types";
export type {
	Image,
	ImageMeta,
	Link,
	RawImage,
	ResponsiveImage,
	Seo,
	SeoData,
} from "./lib/base.types";

export { fetchLoaderData } from "./loader/api/loader.fetch";
export type { Loader, LoaderData } from "./loader/model/loader.types";

export { fetchPhotographyData } from "./photography/api/photography.fetch";
export type {
	Photo,
	Photography,
	PhotographyData,
	PhotographySetData,
} from "./photography/model/photography.types";
export { fetchProjectPages } from "./project/api/project.fetch";
export type { ProjectPage } from "./project/model/project.types";
export { fetchSiteSettings } from "./site-settings/api/site-settings.fetch";
export type {
	SiteFooter,
	SiteSettings,
	SiteSettingsData,
} from "./site-settings/model/site-settings.types";
