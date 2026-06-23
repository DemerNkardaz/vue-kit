import { unref, type Ref } from 'vue';
import type { PxHandler } from '@/types/shared';
import { rootFontSize } from '@/composables/useRootFontSize';

/**
 * A default pixel handler that returns the input value as-is.
 * Used when no scaling or transformation is required.
 */
export const defPxHandler: PxHandler = (val: number): number => val;

/**
 * Creates a PxHandler that scales pixel values dynamically based on
 * the ratio between a current font scale and a base font scale.
 * @param baseFontScale - The baseline font size (default is 16).
 * @param fontScale - The current target font scale/size (defaults to rootFontSize).
 * @returns A PxHandler function that applies the calculated ratio.
 */
export function createFluidPxHandler(
	baseFontScale: Ref<number> | number = 16,
	fontScale: Ref<number> | number = rootFontSize
): PxHandler {
	return (px: number): number => {
		const base = unref(baseFontScale) ?? 16;
		const scale = unref(fontScale) ?? 16;
		return (px / base) * scale;
	};
}

/**
 * A pre-configured fluid pixel handler instance using standard 16px as the base
 * and the current root font size for scaling.
 */
export const fluidPx: PxHandler = createFluidPxHandler(16, rootFontSize);
