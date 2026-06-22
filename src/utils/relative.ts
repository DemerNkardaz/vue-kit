import { unref, type Ref } from 'vue';
import type { PxHandler } from '@/components/patterns/types';
import { rootFontSize } from '@/composables/useRootFontSize';

/** Identity-хендлер — без fluid-скейлинга. */
export const defPxHandler: PxHandler = (val: number): number => val;

/**
 * Прямой аналог legacy fluidPx: (px / base) * scale.
 * baseFontScale теперь настраиваемый (а не жёстко 16), fontScale —
 * любой ref числа (по умолчанию singleton rootFontSize).
 *
 * НЕ вызывает inject() и вообще не знает о Vue DI — просто читает
 * переданные refs. Поэтому безопасен для вызова из любого места:
 * computed, watcher, вне setup() — как угодно, ровно как legacy fluidPx.
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

/** Готовый дефолтный fluid-хендлер на singleton rootFontSize. */
export const fluidPx: PxHandler = createFluidPxHandler(16, rootFontSize);
