/**
 * Кросс-каттинг типы, общие для ЛЮБЫХ SVG-компонентов проекта —
 * и паттернов (components/patterns), и примитивов (components/primitives).
 *
 * Здесь живёт только то, что встречается в 3+ независимых компонентах
 * с идентичной семантикой. Если поле специфично для одной "семьи"
 * компонентов (например, borderRadius с поддержкой '%' у паттернов,
 * или directions у FrameOutline) — оно остаётся в локальном types.ts
 * этой семьи, а не здесь.
 */

/** Преобразует "логическое" px-значение в реальное (например, под адаптив/zoom). */
export type PxHandler = (val: number) => number;

/** Цвет фигуры и её прозрачность. */
export interface ColorProps {
	color?: string;
	opacity?: number;
}

/** Опциональный цвет фона под фигурой/паттерном. */
export interface BackgroundFillProps {
	bgColor?: string;
	bgOpacity?: number;
}

/** Внешние размеры контейнера. */
export interface DimensionProps {
	w?: number | string;
	h?: number | string;
}

/** Поддержка адаптивных px-значений. */
export interface FluidProps {
	pxHandler?: PxHandler;
}
