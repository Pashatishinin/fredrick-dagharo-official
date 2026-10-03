import { mapGif } from "../../lib/image.mappers";
import type { Loader, LoaderData } from "./loader.types";

/** Длительность по умолчанию, если в студии поле пустое. */
const DEFAULT_DURATION = 2.5;

/** Гифку отдаём как есть, без пережатия — анимацию CDN не переживёт. */
export const mapLoader = (loader: LoaderData | null | undefined): Loader => ({
	gif: mapGif(loader?.preLoader),
	duration: loader?.duration && loader.duration > 0 ? loader.duration : DEFAULT_DURATION,
});
