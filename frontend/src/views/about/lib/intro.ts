import { gsap } from "gsap";

/** Если MainLayout не успел выставить задержку — стартуем почти сразу. */
const DEFAULT_DELAY = 0.2;

/**
 * Появление первого экрана: строки заголовка и портрет.
 * Всё, что ниже сгиба, анимирует TextEffect по скроллу — иначе элементы
 * «проигрывали» бы появление за кадром.
 */
export const initAboutIntro = () => {
	const section = document.querySelector<HTMLElement>(".c-about");
	if (!section || section.dataset.animated) return;
	section.dataset.animated = "true";

	const targets = [
		...section.querySelectorAll(".c-about__mark-line"),
		section.querySelector(".c-about__figure"),
	].filter(Boolean);

	if (!targets.length) return;

	if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
		gsap.set(targets, { autoAlpha: 1, y: 0 });
		return;
	}

	gsap.from(targets, {
		y: 24,
		autoAlpha: 0,
		duration: 0.9,
		stagger: 0.12,
		ease: "power3.out",
		delay: window.HERO_DELAY ?? DEFAULT_DELAY,
	});
};
