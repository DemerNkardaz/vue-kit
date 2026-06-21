/**
 * Типы для компонентов паттернов (components/patterns/*).
 *
 * Кросс-каттинг куски (цвет, размеры, pxHandler) переехали в
 * `types/shared.ts`, т.к. ими пользуются и компоненты из
 * `components/primitives/*`, не имеющие никакого отношения к паттернам.
 * Здесь остаются только алиасы для обратной совместимости импортов и то,
 * что реально специфично для "клеточных" паттернов.
 */
import type {
	ColorProps,
	BackgroundFillProps,
	DimensionProps,
	FluidProps,
	PxHandler,
} from '@/types/shared';

export type { PxHandler };

/** Управление цветом фигур паттерна и фоном под ним. */
export type PatternColorProps = ColorProps & BackgroundFillProps;

/** Внешние размеры контейнера паттерна. */
export type PatternDimensionProps = DimensionProps;

/** Поддержка адаптивных px-значений. */
export type PatternFluidProps = FluidProps;

/**
 * Базовый набор пропсов для "клеточных" паттернов — построенных из
 * повторяющихся квадратов с зазором (Checkboard, QuadsGrid, Quads).
 */
export interface PatternCellProps
	extends PatternColorProps, PatternDimensionProps, PatternFluidProps {
	sizePx?: number;
	gapPx?: number;
	borderRadius?: number | string;
}

/** Результат расчёта геометрии одной "клетки" паттерна. */
export interface CellGeometry {
	/** Размер стороны клетки в реальных px. */
	cell: number;
	/** Зазор между клетками в реальных px. */
	gap: number;
	/** cell + gap — шаг повторения паттерна. */
	total: number;
	/** Радиус скругления клетки в px. */
	rx: number;
}

/** Спецификация заполненных колонок в строке / строк в колонке (Quads). */
export type RowSpec = number | number[];
export type ColSpec = number | number[];

export interface QuadsProps extends PatternCellProps {
	row?: RowSpec[];
	col?: ColSpec[];
	count?: number;
}

export interface StripesProps extends PatternColorProps, PatternDimensionProps, PatternFluidProps {
	stripesPx?: number;
	gapPx?: number;
	angle?: number;
}
