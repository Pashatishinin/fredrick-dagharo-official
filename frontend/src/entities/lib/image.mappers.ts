import { urlForImage } from "../../shared/urlForImage";
import type { Image, RawImage, ResponsiveImage } from "./base.types";

/** Ширина крупной версии по умолчанию. */
const FULL_WIDTH = 1600;
/** Ширина мелкой версии для сеток и миниатюр. */
const THUMB_WIDTH = 480;

const EMPTY: Image = { url: null, alt: "", width: null, height: null, lqip: null };

/**
 * Собирает URL нужного размера на CDN Sanity.
 * `auto("format")` отдаёт webp или avif по заголовку Accept браузера —
 * поэтому конвертировать файлы руками не нужно.
 */
export const imageUrl = (img: RawImage | null | undefined, width = FULL_WIDTH, quality = 82) =>
	img?.asset ? urlForImage(img).width(width).quality(quality).auto("format").url() : null;

/** Картинка одного размера. */
export const mapImage = (
	img: RawImage | null | undefined,
	width = FULL_WIDTH,
	fallbackAlt = "",
): Image => {
	if (!img?.asset) return { ...EMPTY, alt: fallbackAlt };

	return {
		url: imageUrl(img, width),
		alt: img.alt ?? fallbackAlt,
		width: img.meta?.dimensions?.width ?? null,
		height: img.meta?.dimensions?.height ?? null,
		lqip: img.meta?.lqip ?? null,
	};
};

/**
 * Две версии одного кадра. Нужна там, где один и тот же снимок
 * показывается и миниатюрой, и во всю ширину: иначе сетка тянет
 * полноразмерный файл ради картинки в 150px.
 */
export const mapResponsiveImage = (
	img: RawImage | null | undefined,
	fallbackAlt = "",
	{ thumb = THUMB_WIDTH, full = FULL_WIDTH } = {},
): ResponsiveImage => ({
	...mapImage(img, full, fallbackAlt),
	thumb: imageUrl(img, thumb, 80),
});

/** Гифки отдаём как есть: пережимать анимацию нельзя. */
export const mapGif = (img: RawImage | null | undefined): string | null =>
	img?.asset ? urlForImage(img).url() : null;

/**
 * Оригинал без пережатия и смены формата — для логотипов: SVG должен
 * остаться векторным, а PNG — с прозрачностью.
 */
export const mapOriginalImage = (img: RawImage | null | undefined, alt = ""): Image => {
	if (!img?.asset) return { ...EMPTY, alt };

	return {
		url: urlForImage(img).url(),
		alt: img.alt ?? alt,
		width: img.meta?.dimensions?.width ?? null,
		height: img.meta?.dimensions?.height ?? null,
		lqip: null,
	};
};

export const mapImages = (
	list: RawImage[] | null | undefined,
	width = FULL_WIDTH,
	fallbackAlt = "",
): Image[] => (list ?? []).map((img) => mapImage(img, width, fallbackAlt));
