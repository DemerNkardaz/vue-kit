import { computed, type ComputedRef } from 'vue';
import type { CellGeometry, PxHandler } from '@/components/patterns/types';

export interface CellGeometryInput {
	sizePx: number;
	gapPx: number;
	borderRadius: number | string;
	pxHandler: PxHandler;
}

/**
 * Считает геометрию одной клетки "клеточного" паттерна: размер, зазор,
 * шаг повторения и радиус скругления (borderRadius может быть в px или
 * в % от половины клетки).
 *
 * Используется в Checkboard / QuadsGrid / Quads.
 *
 * Важно: принимает reactive-объект пропсов целиком (а не его
 * деструктуризацию), чтобы доступ к полям внутри computed оставался
 * реактивным.
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
