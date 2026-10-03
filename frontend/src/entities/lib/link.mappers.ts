import type { Link } from "./base.types";

/**
 * Ссылка без адреса или без подписи ломает список, поэтому такие выкидываем.
 */
export const mapLinks = (links: Link[] | null | undefined): Link[] =>
	(links ?? [])
		.filter((link) => Boolean(link?.url) && Boolean(link?.label))
		.map((link) => ({ label: link.label, url: link.url }));
