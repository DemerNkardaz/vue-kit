/**
 * Cross-cutting types shared across ALL SVG components in the project,
 * including both patterns (components/patterns) and primitives (components/primitives).
 *
 * This file contains only shared properties that appear in 3+ independent
 * component families with identical semantics. Properties specific to a single
 * family (e.g., borderRadius with '%' support for patterns) remain in their
 * respective local types.ts files.
 */

/** * Converts a "logical" pixel value into a real pixel value,
 * typically used for responsiveness or zoom scaling.
 */
export type PxHandler = (val: number) => number;

/** * Properties defining the foreground color and transparency of a shape.
 */
export interface ColorProps {
	/** The fill or stroke color of the element. */
	color?: string;
	/** The opacity level, typically ranging from 0 to 1. */
	opacity?: number;
}

/** * Properties defining an optional background fill behind a shape or pattern.
 */
export interface BackgroundFillProps {
	/** The background color applied behind the component. */
	bgColor?: string;
	/** The opacity level for the background color. */
	bgOpacity?: number;
}

/** * Properties defining the physical dimensions of the container.
 */
export interface DimensionProps {
	/** The width of the element (number for pixels, string for relative units). */
	w?: number | string;
	/** The height of the element (number for pixels, string for relative units). */
	h?: number | string;
}

/** * Support for fluid/responsive pixel values.
 */
export interface FluidProps {
	/** * An optional handler to transform pixel values based on the current
	 * environment (e.g., font scale, screen size).
	 */
	pxHandler?: PxHandler;
}
