import { about } from "./about";
import { archive } from "./archive";
import { contacts } from "./contacts";
import { films } from "./films";
import { home } from "./home";
import { link } from "./link";
import { loader } from "./loader";
import { photography } from "./photography";
import { photographyPage } from "./photographyPage";
import { seo } from "./seo";
import { siteSettings } from "./siteSettings";

export const schemaTypes = [
	// Objects reused inside documents
	link,
	seo,

	// Singletons
	siteSettings,
	home,
	archive,
	photographyPage,
	loader,
	about,
	contacts,

	// Collections
	films,
	photography,
];
