import type { ColorProps, BackgroundFillProps, DimensionProps, FluidProps } from '@/types/shared';

/**
 * Defines the cardinal directions used for positioning or drawing strokes.
 */
export type Direction = 'top' | 'right' | 'bottom' | 'left';

/**
 * Properties for components that represent a frame or outline structure.
 * * @remarks
 * The `borderRadius` here is strictly defined as a number (in pixels),
 * distinguishing it from pattern-based components that support percentage-based radii.
 */
export interface FrameOutlineProps extends ColorProps, BackgroundFillProps, FluidProps {
	/** The thickness of the outline in pixels. */
	thicknessPx?: number;
	/** The border radius of the frame corners in pixels. */
	borderRadius?: number;
	/** Specifies which sides to render. 'full' for all sides or an array of specific directions. */
	directions?: 'full' | Direction[];
	/** Global length override for the frame sides. */
	length?: number | string;
	/** Length override for the top side. */
	lengthTop?: number | string;
	/** Length override for the right side. */
	lengthRight?: number | string;
	/** Length override for the bottom side. */
	lengthBottom?: number | string;
	/** Length override for the left side. */
	lengthLeft?: number | string;
}

/**
 * Represents a coordinate pair [x, y] used for offset calculations.
 */
export type CornerOffset = [number, number];

/**
 * Properties for stripe or strip-like geometric components.
 */
export interface StripProps extends ColorProps, DimensionProps, FluidProps {
	/** Width of the strip (number for pixels, string for relative units). */
	stripW?: number | string;
	/** Height of the strip (number for pixels, string for relative units). */
	stripH?: number | string;
	/** The border radius applied to the corners of the strip in pixels. */
	borderRadius?: number;
	/** X and Y offset for the top-left corner. */
	cornerTopLeft?: CornerOffset;
	/** X and Y offset for the top-right corner. */
	cornerTopRight?: CornerOffset;
	/** X and Y offset for the bottom-right corner. */
	cornerBottomRight?: CornerOffset;
	/** X and Y offset for the bottom-left corner. */
	cornerBottomLeft?: CornerOffset;
}
