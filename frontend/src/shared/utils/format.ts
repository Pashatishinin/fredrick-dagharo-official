/**
 * Порядковый номер в оформлении сайта: индекс 0 → «01».
 * Один формат для галереи главной, архива и списка услуг на About.
 */
export const formatIndex = (index: number) => (index + 1).toString().padStart(2, "0");

/**
 * Начало текста для meta description: обрезаем по границе слова,
 * чтобы поисковик не показывал оборванное «наполов…».
 */
export const excerpt = (text: string | undefined | null, max = 160) => {
	const clean = (text ?? "").replace(/\s+/g, " ").trim();
	if (clean.length <= max) return clean;

	const cut = clean.slice(0, max - 1);
	const lastSpace = cut.lastIndexOf(" ");
	return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[,.;:—-]+$/, "")}…`;
};
