import { gsap } from "gsap";
import { CustomEase } from "gsap/dist/CustomEase";
import { Flip } from "gsap/dist/Flip";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import { cardAt, previewIndexAtCenter } from "./slider";

gsap.registerPlugin(ScrollToPlugin, Flip, CustomEase);
CustomEase.create("hop", "M0, 0 C0.028, 0.528 0.129, 0.74 0.27, 0.852 0.415, 0.967 0.499, 1 1, 1");

const LAYOUTS = ["layout-grid", "layout-slider"] as const;
type Layout = (typeof LAYOUTS)[number];

/** Совпадает с брейкпоинтом md в стилях — ниже него макет один. */
const MOBILE_MAX = 768;
/** Отступ рамки вокруг миниатюры, px. */
const FRAME_PAD = 5;

/**
 * Галерея /photography: две раскладки — сетка (GRID) и слайдер (SLIDER),
 * где колонка миниатюр едет синхронно с крупными превью, а рамка в
 * центре экрана показывает текущий снимок. Переключение — через Flip.
 */
export const initPhotography = () => {
	const section = document.querySelector<HTMLElement>(".c-photo");
	if (!section || section.dataset.galleryReady) return;

	// На телефоне снимки идут одной колонкой: переключать нечего. Выходим
	// до пометки готовности — при заходе с широкого экрана всё сработает.
	if (window.innerWidth < MOBILE_MAX) return;

	const gallery = section.querySelector<HTMLElement>(".c-photo__gallery");
	const previewColumn = section.querySelector<HTMLElement>(".c-photo__previews");
	const frame = section.querySelector<HTMLElement>(".c-photo__frame");
	const buttons = [...section.querySelectorAll<HTMLButtonElement>(".c-photo__nav-link")];
	if (!gallery || !previewColumn || !frame) return;
	section.dataset.galleryReady = "true";

	const cards = [...gallery.querySelectorAll<HTMLElement>(".c-photo__card")];
	const previews = [...previewColumn.querySelectorAll<HTMLElement>("img")];

	// Пишем transform напрямую, без твина: превью прокручиваются нативно,
	// и любой твин давал колонке отставание. quickSetter — без нового твина
	// на каждое событие скролла.
	const setGalleryY = gsap.quickSetter(gallery, "y", "px") as (value: number) => void;
	let frameHeight = 0;

	// Активную раскладку читаем из разметки, а не задаём константой.
	let activeLayout: Layout = LAYOUTS.find((name) => gallery.classList.contains(name)) ?? LAYOUTS[0];
	gallery.classList.add(activeLayout);

	// Рамка неподвижна в центре экрана, движется только колонка миниатюр.
	const handleScroll = () => {
		if (activeLayout !== "layout-slider" || !cards.length || !previews.length) return;

		const windowHeight = window.innerHeight;
		const galleryTop = Number.parseFloat(getComputedStyle(gallery).top) || 0;
		const card = cardAt(cards, previewIndexAtCenter(previews, windowHeight));

		setGalleryY(windowHeight / 2 - galleryTop - card.center);

		// height — layout-свойство, пишем только при смене целого значения.
		const nextFrameHeight = Math.round(card.height + FRAME_PAD * 2);
		if (nextFrameHeight !== frameHeight) {
			frameHeight = nextFrameHeight;
			gsap.set(frame, { height: nextFrameHeight });
		}
	};

	// Побочные эффекты раскладки: видимость превью и рамки, слушатель скролла.
	const applyLayout = (layout: Layout) => {
		const isSlider = layout === "layout-slider";

		gsap.to([previewColumn, frame], {
			autoAlpha: isSlider ? 1 : 0,
			duration: 0.3,
			delay: isSlider ? 0.5 : 0,
		});

		if (isSlider) {
			window.addEventListener("scroll", handleScroll, { passive: true });
			handleScroll();
		} else {
			window.removeEventListener("scroll", handleScroll);
			gsap.set(gallery, { clearProps: "y" });
		}

		for (const button of buttons) {
			const active = button.id === layout;
			button.classList.toggle("active", active);
			button.setAttribute("aria-pressed", String(active));
		}
	};

	const switchTo = (layout: Layout) => {
		const state = Flip.getState(cards);
		const collapsing = activeLayout === "layout-grid";

		gallery.classList.replace(activeLayout, layout);
		Flip.from(state, { duration: 1.5, ease: "hop", stagger: collapsing ? 0 : 0.025 });

		activeLayout = layout;
		applyLayout(layout);
	};

	const switchLayout = (layout: Layout) => {
		if (layout === activeLayout) return;

		// Из слайдера сначала возвращаемся наверх, потом перестраиваемся.
		if (activeLayout === "layout-slider" && window.scrollY > 0) {
			gsap.to(window, {
				scrollTo: { y: 0 },
				duration: 0.5,
				ease: "power3.out",
				onComplete: () => switchTo(layout),
			});
			return;
		}

		switchTo(layout);
	};

	for (const button of buttons) {
		const layout = LAYOUTS.find((name) => name === button.id);
		if (layout) button.addEventListener("click", () => switchLayout(layout));
	}

	applyLayout(activeLayout);

	// Слушатель скролла висит на window и пережил бы уход со страницы.
	document.addEventListener(
		"astro:before-swap",
		() => window.removeEventListener("scroll", handleScroll),
		{ once: true },
	);
};
