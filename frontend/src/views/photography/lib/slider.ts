/**
 * Геометрия слайдера: где сейчас колонка превью и где должна стоять
 * колонка миниатюр, чтобы текущий снимок оказался в рамке.
 * Чистые функции — получают элементы, ничего не меняют.
 */

/**
 * Дробный индекс снимка, который сейчас в центре экрана.
 *
 * Отсчёт идёт от ЦЕНТРА снимка к центру следующего — так же, как cardAt
 * интерполирует центры миниатюр. Считаем по фактическим прямоугольникам,
 * а не по единому шагу колонки: при разной высоте снимков общего шага нет.
 */
export const previewIndexAtCenter = (previews: HTMLElement[], windowHeight: number) => {
	const center = windowHeight / 2;
	let index = 0;

	for (let i = 0; i < previews.length; i++) {
		const rect = previews[i].getBoundingClientRect();
		const itemCenter = rect.top + rect.height / 2;
		if (itemCenter > center) break;

		const next = previews[i + 1]?.getBoundingClientRect();
		const nextCenter = next ? next.top + next.height / 2 : itemCenter + rect.height;
		const span = nextCenter - itemCenter;

		index = i + (span > 0 ? Math.min(1, (center - itemCenter) / span) : 0);
	}

	return Math.min(previews.length - 1, Math.max(0, index));
};

/**
 * Центр и высота миниатюры с таким дробным индексом (без учёта сдвига
 * колонки). Высоту интерполируем так же, как центр: иначе на границе
 * между разноформатными снимками рамка прыгала бы к размеру соседа.
 */
export const cardAt = (cards: HTMLElement[], index: number) => {
	const i = Math.min(cards.length - 1, Math.max(0, Math.floor(index)));
	const fraction = index - i;
	const isLast = i + 1 >= cards.length;

	const centerOf = (k: number) => cards[k].offsetTop + cards[k].offsetHeight / 2;
	const current = centerOf(i);
	const next = isLast ? current + cards[i].offsetHeight : centerOf(i + 1);

	const currentHeight = cards[i].offsetHeight;
	const nextHeight = isLast ? currentHeight : cards[i + 1].offsetHeight;

	return {
		center: current + (next - current) * fraction,
		height: currentHeight + (nextHeight - currentHeight) * fraction,
	};
};
