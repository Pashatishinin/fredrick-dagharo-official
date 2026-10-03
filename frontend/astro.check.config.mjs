// @ts-check

// Отдельный конфиг только для `astro check`.
//
// Проверка поднимает свой vite и пересобирает предсобранные зависимости
// в node_modules/.vite — то есть в той же папке, откуда их раздаёт уже
// запущенный dev-сервер. Старые файлы при этом исчезают, браузер получает
// 504 Outdated Optimize Dep, и на странице молча перестаёт работать весь
// JS. Поэтому у проверки свой кэш.
//
// Запуск: npx astro check --config astro.check.config.mjs

import config from "./astro.config.mjs";

export default {
	...config,
	vite: {
		...config.vite,
		cacheDir: "node_modules/.vite-check",
	},
};
