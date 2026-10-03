/**
 * Многострочное поле студии → список строк. Редактор ставит переносы там,
 * где строка должна оборваться в макете (заголовок About, логотип);
 * пустые строки отбрасываем.
 */
export const splitLines = (value: string | undefined | null): string[] =>
	(value ?? "")
		.split("\n")
		.map((line) => line.trim())
		.filter(Boolean);
