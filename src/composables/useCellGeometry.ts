import { computed, type ComputedRef } from 'vue';
import type { CellGeometry } from '@/components/patterns/types';
import type { PxHandler } from '@/types/shared';

/**
 * Input parameters for calculating cell geometry.
 */
export interface CellGeometryInput {
	/** The base size of the cell in pixels. */
	sizePx: number;
	/** The gap size between cells in pixels. */
	gapPx: number;
	/** * Border radius of the cell.
	 * Can be a number (pixels) or a string (percentage, e.g., '50%').
	 */
	borderRadius: number | string;
	/** Function to transform logical pixels for responsiveness. */
	pxHandler: PxHandler;
}

/**
 * Calculates the geometry of a single cell in a grid pattern, including
 * dimensions, gaps, repetition steps, and border radius.
 *
 * The `borderRadius` calculation handles both absolute pixel values and
 * percentage-based values (relative to half the cell size).
 *
 * @remarks
 * This composable expects an object with getters for its properties to maintain
 * reactivity when accessed within the `computed` effect.
 *
 * @param props - An object providing reactive access to the cell configuration.
 * @returns A computed object containing the calculated cell metrics.
 * @example
 * useCellGeometry({
 * 	get sizePx() { return props.sizePx; },
 * 	get gapPx() { return props.gapPx; },
 * 	get borderRadius() { return props.borderRadius; },
 * 	get pxHandler() { return pxHandler.value; },
 * });
 */
export function useCellGeometry(props: CellGeometryInput): ComputedRef<CellGeometry> {
	return computed(() => {
		const cell = props.pxHandler(props.sizePx);
		const gap = props.pxHandler(props.gapPx);
		const total = cell + gap;

		const rx =
			typeof props.borderRadius === 'number'
				? props.pxHandler(props.borderRadius)
				: (parseFloat(props.borderRadius as string) / 100) * (cell / 2);

		return { cell, gap, total, rx };
	});
}
