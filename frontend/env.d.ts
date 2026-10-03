interface ImportMetaEnv {
	readonly PUBLIC_SANITY_PROJECT_ID: string;
	readonly PUBLIC_SANITY_DATASET: string;
	readonly PUBLIC_SANITY_API_VERSION: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

interface Window {
	/** Задержка первой анимации страницы, с. Выставляет MainLayout: на первом
	 *  заходе ждём заставку, при переходах по сайту — почти сразу. */
	HERO_DELAY?: number;
	/** Заставка уже показывалась на этой вкладке (ставит Loader.astro). */
	LOADER_SEEN?: boolean;
}
