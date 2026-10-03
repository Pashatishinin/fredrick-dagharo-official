/**
 * Отложенный монтаж тяжёлых встраиваний (в первую очередь vimeo-плееров).
 *
 * Зачем: iframe с плеером тянет ~600 КБ скриптов и сразу открывает HLS-поток.
 * Если таких плееров на странице два, они делят канал пополам и оба стартуют
 * вдвое дольше. Поэтому src не проставляем в разметке, а подставляем из
 * data-src, когда блок приближается к вьюпорту.
 *
 * rootMargin задаём с запасом: плеер должен успеть подняться ДО того, как
 * пользователь доскроллит, иначе вместо ускорения получим чёрный прямоугольник.
 *
 * Разметка:
 *   <div data-embed>
 *     <iframe data-src="..."></iframe>
 *   </div>
 * После загрузки на контейнер вешается класс is-ready — под него можно
 * подвязать проявление видео поверх постера.
 */

type MountOptions = {
	/** За сколько экранов до появления начинать грузить. 2 = за два экрана. */
	screensAhead?: number;
};

const mountEmbed = (host: HTMLElement) => {
	if (host.dataset.mounted) return;
	host.dataset.mounted = "true";

	const frame = host.querySelector<HTMLIFrameElement>("iframe[data-src]");
	if (!frame?.dataset.src) return;

	frame.addEventListener("load", () => host.classList.add("is-ready"), { once: true });
	frame.src = frame.dataset.src;
	frame.removeAttribute("data-src");
};

export const mountOnApproach = (selector: string, { screensAhead = 2 }: MountOptions = {}) => {
	const targets = document.querySelectorAll<HTMLElement>(selector);
	if (!targets.length) return;

	// Без IntersectionObserver просто грузим сразу — лучше медленно, чем никак.
	if (!("IntersectionObserver" in window)) {
		for (const target of targets) mountEmbed(target);
		return;
	}

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				observer.unobserve(entry.target);
				mountEmbed(entry.target as HTMLElement);
			}
		},
		{ rootMargin: `${screensAhead * 100}% 0px` },
	);

	for (const target of targets) observer.observe(target);
};
