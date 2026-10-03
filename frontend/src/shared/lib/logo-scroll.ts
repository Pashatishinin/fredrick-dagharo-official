import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const isHomePath = (pathname: string) => pathname === "/" || pathname === "/index.html";

/**
 * Логотип на главной не перезагружает страницу, а плавно уводит наверх;
 * на остальных страницах это обычная ссылка на главную.
 * Общий для шапки и футера.
 */
export const initLogoScroll = (logo: HTMLAnchorElement | null) => {
	if (!logo) return;

	logo.onclick = (event) => {
		if (!isHomePath(window.location.pathname)) return;

		event.preventDefault();
		gsap.to(window, { duration: 1.2, scrollTo: 0, ease: "power4.inOut" });
	};
};
