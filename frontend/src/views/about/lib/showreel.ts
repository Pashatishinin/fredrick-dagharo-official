import { initParallax } from "../../../shared/animation/parallax";
import { mountOnApproach } from "../../../shared/lib/mount-on-approach";

/**
 * Какую долю запаса по высоте отдаём под ход параллакса. Остаток —
 * страховка: на дробных размерах и при зуме в полосе не должен
 * показаться чёрный край.
 */
const TRAVEL_RATIO = 0.8;

/** Плеер поднимаем за два экрана: к моменту скролла видео уже играет. */
const SCREENS_AHEAD = 2;

const initShowreelParallax = () => {
	const media = document.querySelector<HTMLElement>(".c-about__showreel-media");
	const frame = media?.parentElement;
	if (!media || !frame || media.dataset.parallax) return;
	if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

	// Ход считаем из фактического перепада высот, а не константой: тогда
	// пропорции полосы можно менять в CSS, ничего не трогая здесь.
	const slack = (media.offsetHeight - frame.offsetHeight) / 2;
	if (slack <= 0) return;

	media.dataset.parallax = "true";
	initParallax(media, ((slack * TRAVEL_RATIO) / media.offsetHeight) * 100);
};

export const initShowreel = () => {
	mountOnApproach("[data-showreel]", { screensAhead: SCREENS_AHEAD });
	initShowreelParallax();
};
