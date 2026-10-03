import Player from "@vimeo/player";
import { initParallax } from "../../../shared/animation/parallax";

/** Насколько обложка ходит внутри hero, % своей высоты. */
const COVER_SHIFT = 20;

/**
 * Hero проекта: обложка с параллаксом и модалка с плеером Vimeo.
 *
 * Плеер (~600 КБ скриптов и поток) не грузится вместе со страницей —
 * его создаём при первом намерении смотреть: нажатие на обложку или
 * фокус на ней с клавиатуры. Наведение не подходит: обложка занимает
 * весь первый экран, курсор над ней почти всегда, и плеер грузился бы
 * сразу. pointerdown приходит на доли секунды раньше click — этого
 * хватает, чтобы запрос ушёл раньше открытия модалки.
 */
export const initProjectHero = () => {
	const hero = document.querySelector<HTMLElement>("[data-project-hero]");
	if (!hero || hero.dataset.ready) return;
	hero.dataset.ready = "true";

	const cover = hero.querySelector<HTMLElement>(".c-project-hero__cover");
	if (cover) initParallax(cover, COVER_SHIFT);

	const vimeoId = Number(hero.dataset.filmVideo);
	const openButton = hero.querySelector<HTMLButtonElement>(".c-project-hero__play");
	const modal = hero.querySelector<HTMLElement>(".c-project-modal");
	const mount = modal?.querySelector<HTMLElement>(".c-project-modal__player");
	const closeButton = modal?.querySelector<HTMLButtonElement>(".c-project-modal__close");
	if (!vimeoId || !openButton || !modal || !mount || !closeButton) return;

	let player: Player | null = null;

	const getPlayer = () => {
		if (player) return player;

		const created = new Player(mount, { id: vimeoId, dnt: true, playsinline: true });
		// Рамку подгоняем под реальные пропорции ролика: не все они 16:9.
		created
			.ready()
			.then(() => Promise.all([created.getVideoWidth(), created.getVideoHeight()]))
			.then(([width, height]) => {
				mount.style.aspectRatio = `${width} / ${height}`;
			})
			.catch(() => {});

		player = created;
		return created;
	};

	const open = () => {
		modal.classList.add("is-open");
		modal.inert = false;
		document.body.style.overflow = "hidden";
		closeButton.focus();

		const current = getPlayer();
		// Браузер может запретить автозапуск со звуком — тогда играем без него.
		current
			.play()
			.catch(() => current.setMuted(true).then(() => current.play()))
			.catch(() => {});
	};

	const close = ({ restoreFocus = true } = {}) => {
		if (!modal.classList.contains("is-open")) return;

		modal.classList.remove("is-open");
		modal.inert = true;
		document.body.style.overflow = "";
		player?.pause().catch(() => {});
		if (restoreFocus) openButton.focus();
	};

	openButton.addEventListener("pointerdown", getPlayer, { once: true });
	openButton.addEventListener("focus", getPlayer, { once: true });
	openButton.addEventListener("click", open);
	closeButton.addEventListener("click", () => close());

	// Клик мимо плеера — по затемнению или по полям рамки — закрывает.
	modal.addEventListener("click", (event) => {
		const target = event.target as Element;
		if (!target.closest(".c-project-modal__player, .c-project-modal__close")) close();
	});

	// Слушатель на документе снимаем при уходе со страницы, иначе
	// каждый открытый проект оставлял бы свой.
	const listeners = new AbortController();

	document.addEventListener(
		"keydown",
		(event) => {
			if (event.key === "Escape") close();
		},
		{ signal: listeners.signal },
	);

	document.addEventListener(
		"astro:before-swap",
		() => {
			close({ restoreFocus: false });
			listeners.abort();
		},
		{ once: true },
	);
};
