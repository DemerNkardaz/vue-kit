/**
 * Converts a hexadecimal color string to an RGBA color string.
 * Supports both 3-digit (#RGB) and 6-digit (#RRGGBB) hex formats.
 * @param hex - The hexadecimal color string (e.g., "#FF5733" or "#F33").
 * @param opacity - The alpha channel value, typically between 0 and 1.
 * @returns A string in the format "rgba(r, g, b, a)".
 * @example
 * hexToRgba('#FF0000', 0.5); // returns "rgba(255, 0, 0, 0.5)"
 * hexToRgba('#F00', 1);      // returns "rgba(255, 0, 0, 1)"
 */
export function hexToRgba(hex: string, opacity: number): string {
	const clean = hex.replace('#', '');
	const r = parseInt(clean.length === 3 ? clean.charAt(0).repeat(2) : clean.slice(0, 2), 16);
	const g = parseInt(clean.length === 3 ? clean.charAt(1).repeat(2) : clean.slice(2, 4), 16);
	const b = parseInt(clean.length === 3 ? clean.charAt(2).repeat(2) : clean.slice(4, 6), 16);
	return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
