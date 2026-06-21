/**
 * Конвертирует HEX-цвет (#fff или #ffffff) в строку rgba() с заданной
 * прозрачностью. Чистая функция, без зависимостей от Vue.
 */
export function hexToRgba(hex: string, opacity: number): string {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.length === 3 ? clean.charAt(0).repeat(2) : clean.slice(0, 2), 16);
  const g = parseInt(clean.length === 3 ? clean.charAt(1).repeat(2) : clean.slice(2, 4), 16);
  const b = parseInt(clean.length === 3 ? clean.charAt(2).repeat(2) : clean.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
