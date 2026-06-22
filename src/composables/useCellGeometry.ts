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
 * Важно: принимает объект целиком (а не деструктуризацию его полей),
 * чтобы доступ к полям внутри computed оставался реактивным.
 *
 * Это не обязательно должен быть сам `props` — pxHandler теперь часто
 * приходит не из пропа, а из локального computed (proп ?? инжект из
 * VueKitPlugin), поэтому сюда передают объект-адаптер с геттерами:
 *
 *   useCellGeometry({
 *     get sizePx() { return props.sizePx; },
 *     get gapPx() { return props.gapPx; },
 *     get borderRadius() { return props.borderRadius; },
 *     get pxHandler() { return pxHandler.value; },
 *   });
 *
 * Геттеры читаются синхронно внутри тела computed-эффекта этого
 * composable, поэтому реактивные обращения (и к props, и к pxHandler
 * как к ref) трекаются корректно.
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
