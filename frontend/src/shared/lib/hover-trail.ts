/**
 * «Шлейф» за курсором по сетке плиток: плитка под мышью получает
 * is-active мгновенно и теряет его через `hold` мс, а плавное угасание
 * делает transition в CSS. Используется на портрете About и в фоне футера.
 *
 * Слушатель один на всю сетку, а не на каждую плитку: в футере их сотни.
 */
export const initHoverTrail = (root: HTMLElement | null, itemSelector: string, hold = 400) => {
	if (!root || root.dataset.trailReady) return;
	root.dataset.trailReady = "true";

	const timers = new WeakMap<Element, ReturnType<typeof setTimeout>>();

	root.addEventListener("mouseover", (event) => {
		const item = (event.target as Element | null)?.closest(itemSelector);
		if (!item || !root.contains(item)) return;

		clearTimeout(timers.get(item));
		item.classList.add("is-active");
		timers.set(
			item,
			setTimeout(() => item.classList.remove("is-active"), hold),
		);
	});
};
