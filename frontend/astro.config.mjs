// @ts-check

import sanity from "@sanity/astro";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, PUBLIC_SANITY_API_VERSION } = loadEnv(
	process.env.NODE_ENV || "development",
	process.cwd(),
	"",
);

// https://astro.build/config
export default defineConfig({
	vite: {
		server: {
			fs: {
				allow: [".."],
			},
		},
		plugins: [tailwindcss()],
		ssr: {
			noExternal: ["gsap"],
		},
		optimizeDeps: {
			include: ["gsap", "gsap/ScrollTrigger"],
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
