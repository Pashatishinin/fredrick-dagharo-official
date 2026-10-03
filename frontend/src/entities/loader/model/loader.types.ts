import type { RawImage } from "../../lib/base.types";

/** Сырой синглтон `siteLoader` из Sanity. */
export interface LoaderData {
	preLoader?: RawImage | null;
	duration?: number | null;
}

export interface Loader {
	/** Гифка заставки. null — заставки нет, страница показывается сразу. */
	gif: string | null;
	/** Сколько секунд заставка держится на экране, прежде чем погаснуть. */
	duration: number;
}
