import type { ColorProps, BackgroundFillProps, DimensionProps, FluidProps } from '@/types/shared';

export type Direction = 'top' | 'right' | 'bottom' | 'left';

/**
 * borderRadius у примитивов — всегда число в px (в отличие от паттернов,
 * где допускается '%' от половины клетки). Поэтому не выносим в shared —
 * семантика разная, общее поле здесь было бы враньём ради DRY.
 */
export interface FrameOutlineProps extends ColorProps, BackgroundFillProps, FluidProps {
	thicknessPx?: number;
	borderRadius?: number;
	directions?: 'full' | Direction[];
	length?: number | string;
	lengthTop?: number | string;
	lengthRight?: number | string;
	lengthBottom?: number | string;
	lengthLeft?: number | string;
}

export type CornerOffset = [number, number];

export interface StripProps extends ColorProps, DimensionProps, FluidProps {
	stripW?: number | string;
	stripH?: number | string;
	borderRadius?: number;
	cornerTopLeft?: CornerOffset;
	cornerTopRight?: CornerOffset;
	cornerBottomRight?: CornerOffset;
	cornerBottomLeft?: CornerOffset;
}
