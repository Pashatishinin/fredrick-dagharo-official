// @ts-check

import sanity from "@sanity/astro";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, PUBLIC_SANITY_API_VERSION } = loadEnv(
	process.env.NODE_ENV || "development",
	process.cwd(),
	"",
);

// https://astro.build/config
export default defineConfig({
	// /studio ведёт в задеплоенную Sanity Studio. На статической сборке
	// Astro создаёт страницу с мгновенным переходом (meta refresh) и
	// noindex — поисковики её не проиндексируют.
	redirects: {
		"/studio": "https://fredrick-dagharo.sanity.studio/",
	},
	vite: {
		server: {
			fs: {
				allow: [".."],
			},
		},
		ssr: {
			noExternal: ["gsap"],
		},
		optimizeDeps: {
			// Перечислять надо РОВНО те пути, которые импортирует код.
			// Здесь стояло "gsap/ScrollTrigger", а импортируется
			// "gsap/dist/ScrollTrigger" — из-за этого плагины не попадали
			// в предсборку, vite находил их уже на лету и пересобирал
			// зависимости прямо во время работы. Браузер в этот момент
			// получал 504 Outdated Optimize Dep, модуль не грузился,
			// и секция оставалась без обработчиков.
			include: [
				"gsap",
				"gsap/dist/ScrollTrigger",
				"gsap/dist/ScrollToPlugin",
				"gsap/dist/SplitText",
				"gsap/dist/Flip",
				"gsap/dist/CustomEase",
			],
		},
	},
	integrations: [
		sanity({
			projectId: PUBLIC_SANITY_PROJECT_ID,
			dataset: PUBLIC_SANITY_DATASET,
			useCdn: false,
			apiVersion: PUBLIC_SANITY_API_VERSION || "2024-03-27",
		}),
	],
});
