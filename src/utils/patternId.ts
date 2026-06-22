/** Генерирует уникальный id для <pattern> с заданным префиксом. */
export function generatePatternId(prefix: string): string {
	return `${prefix}-${Math.random().toString(36).slice(2, 7)}`;
}
