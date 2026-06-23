import type { ColorProps, BackgroundFillProps, DimensionProps, FluidProps } from '@/types/shared';

/**
 * Type aliases for pattern components.
 * Shared properties (color, dimensions, pxHandler) are moved to `types/shared.ts`.
 * This file maintains backward compatibility and defines structures specific to "cellular" patterns.
 */

/** Manages the color of pattern shapes and their background. */
export type PatternColorProps = ColorProps & BackgroundFillProps;

/** External dimensions of the pattern container. */
export type PatternDimensionProps = DimensionProps;

/** Support for adaptive pixel values. */
export type PatternFluidProps = FluidProps;

/**
 * Base set of properties for "cellular" patterns — structures built from
 * repeating squares with gaps (e.g., Checkboard, QuadsGrid, Quads).
 */
export interface PatternCellProps
	extends PatternColorProps, PatternDimensionProps, PatternFluidProps {
	/** Size of the cell in pixels. */
	sizePx?: number;
	/** Gap between cells in pixels. */
	gapPx?: number;
	/** Border radius of the cell (number in px or string in %). */
	borderRadius?: number | string;
}

/** The result of a single "cell" geometry calculation. */
export interface CellGeometry {
	/** Side length of the cell in actual pixels. */
	cell: number;
	/** Gap between cells in actual pixels. */
	gap: number;
	/** The repetition step of the pattern (cell + gap). */
	total: number;
	/** Border radius of the cell in pixels. */
	rx: number;
}

/** Specification of populated columns in a row or rows in a column (for Quads). */
export type RowSpec = number | number[];
export type ColSpec = number | number[];

/** Properties for the Quads pattern component. */
export interface QuadsProps extends PatternCellProps {
	row?: RowSpec[];
	col?: ColSpec[];
	count?: number;
}

/** Properties for the Stripes pattern component. */
export interface StripesProps extends ColorProps, BackgroundFillProps, DimensionProps, FluidProps {
	/** Width of the individual stripes in pixels. */
	stripesPx?: number;
	/** Gap between stripes in pixels. */
	gapPx?: number;
	/** The angle of the stripes in degrees. */
	angle?: number;
}
