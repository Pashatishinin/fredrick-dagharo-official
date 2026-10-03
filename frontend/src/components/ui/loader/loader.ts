import { gsap } from "gsap";

/** Сколько секунд контент проявляется, пока гаснет заставка. */
const CONTENT_FADE = 0.5;

let played = false;

/**
 * Таймлайн заставки: держим её `duration` секунд, гасим и проявляем
 * контент. Играет один раз — флаг is-loading на <html> ставит
 * inline-скрипт в Loader.astro только при первом заходе за сессию.
 */
export const playLoader = () => {
	const root = document.documentElement;
	if (played || !root.classList.contains("is-loading")) return;

	const loader = document.getElementById("loader");
	const main = document.getElementById("main-content");

	// Разметки нет — не держим контент скрытым ни секунды.
	if (!loader || !main) {
		root.classList.remove("is-loading");
		return;
	}

	played = true;

	gsap
		.timeline({
			onComplete: () => {
				try {
					sessionStorage.setItem("hasLoaded", "true");
				} catch {
					// Приватный режим без sessionStorage: заставка просто покажется снова.
				}
				root.classList.remove("is-loading");
				gsap.set(main, { clearProps: "opacity" });
			},
		})
		.to(loader, {
			autoAlpha: 0,
			duration: Number(loader.dataset.fade) || 0,
			delay: Number(loader.dataset.duration) || 0,
		})
		.fromTo(main, { opacity: 0 }, { opacity: 1, duration: CONTENT_FADE }, "-=0.4");
};
