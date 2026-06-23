import type { PxHandler } from '@/types/shared';

/**
 * Resolves a dimension value to a CSS-compatible string.
 * If the input is a number, it is processed through the provided `pxHandler`
 * and converted to pixels. String inputs (e.g., '100%') are returned as-is.
 *
 * @param val - The dimension value as a number (unitless) or string (CSS unit).
 * @param pxHandler - The handler function to transform logical pixels.
 * @returns A CSS-compatible dimension string.
 */
export function resolveDimension(val: number | string, pxHandler: PxHandler): string {
	if (typeof val === 'number') {
		return `${pxHandler(val)}px`;
	}
	return val;
}

/**
 * Resolves a dimension value and "snaps" it to the nearest multiple of a given step.
 * Useful for maintaining grid alignment after scaling transformations.
 *
 * @param val - The dimension value as a number (unitless) or string (CSS unit).
 * @param pxHandler - The handler function to transform logical pixels.
 * @param step - The grid step/interval to snap the value to.
 * @returns A CSS-compatible dimension string, snapped to the nearest step.
 */
export function resolveSnappedDimension(
	val: number | string,
	pxHandler: PxHandler,
	step: number
): string {
	if (typeof val === 'number') {
		const fluidVal = pxHandler(val);
		const stretched = Math.ceil(fluidVal / step) * step;
		return `${stretched}px`;
	}
	return val;
}
