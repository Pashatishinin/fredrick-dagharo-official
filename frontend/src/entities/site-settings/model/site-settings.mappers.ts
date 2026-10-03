import { mapOriginalImage } from "../../lib/image.mappers";
import { mapLinks } from "../../lib/link.mappers";
import { mapSeo } from "../../lib/seo.mappers";
import { splitLines } from "../../lib/text.mappers";
import type { SiteSettings, SiteSettingsData } from "./site-settings.types";

export const mapSiteSettings = (settings: SiteSettingsData | null | undefined): SiteSettings => {
	const logo = splitLines(settings?.logo);

	return {
		logo,
		// Текстовый логотип служит картинке альтом
		logoImage: mapOriginalImage(settings?.logoImage, logo.join(" ")),
		footer: {
			social: mapLinks(settings?.footer?.social),
			backgroundVimeoId: settings?.footer?.backgroundVimeoId?.trim() ?? "",
		},
		seo: mapSeo(settings?.seo),
	};
};
