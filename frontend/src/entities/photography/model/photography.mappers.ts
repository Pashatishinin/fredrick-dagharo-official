import type { RawImage } from "../../lib/base.types";
import { mapResponsiveImage } from "../../lib/image.mappers";
import { mapSeo } from "../../lib/seo.mappers";
import type { Photo, Photography, PhotographyData } from "./photography.types";

const THUMB_WIDTH = 420;
const FULL_WIDTH = 1200;

/** Без размеров снимок ломает сетку, поэтому такие кадры отсеиваем. */
const isUsable = (photo: Photo | null): photo is Photo => photo !== null;

export const mapPhoto = (image: RawImage): Photo | null => {
	// alt в студии обязателен — запасного текста в коде нет
	const mapped = mapResponsiveImage(image, "", {
		thumb: THUMB_WIDTH,
		full: FULL_WIDTH,
	});

	if (!mapped.url || !mapped.thumb || !mapped.width || !mapped.height) return null;

	return {
		thumb: mapped.thumb,
		src: mapped.url,
		alt: mapped.alt,
		width: mapped.width,
		height: mapped.height,
		lqip: mapped.lqip,
	};
};

export const mapPhotos = (images: RawImage[] | null | undefined): Photo[] =>
	(images ?? []).map(mapPhoto).filter(isUsable);

/**
 * Наборы разворачиваются в один плоский список: страница показывает общую
 * ленту кадров, а деление на документы — способ хранения, а не раскладка.
 */
export const mapPhotography = (data: PhotographyData | null | undefined): Photography => ({
	seo: mapSeo(data?.seo),
	photos: (data?.sets ?? []).flatMap((set) => mapPhotos(set.photos)),
});
