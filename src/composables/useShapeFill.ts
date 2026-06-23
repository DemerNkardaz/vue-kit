import { computed, type ComputedRef } from 'vue';
import { hexToRgba } from '@/utils/color';

/**
 * Properties required for calculating shape fill colors.
 */
export interface ShapeFillProps {
	/** The primary color of the shape (hex format). */
	color: string;
	/** The opacity level for the primary color (0 to 1). */
	opacity: number;
	/** Optional background color for the shape (hex format). */
	bgColor?: string;
	/** The opacity level for the background color (0 to 1). */
	bgOpacity: number;
}

/**
 * Composable to handle shape fill color processing.
 * Converts hex colors and their respective opacities into RGBA strings.
 * @param props - The ShapeFillProps object containing colors and opacities.
 * @returns An object containing computed properties for primary and background fills.
 */
export function useShapeFill(props: ShapeFillProps): {
	/** Computed RGBA string for the primary shape color. */
	fillColor: ComputedRef<string>;
	/** Computed RGBA string for the background color, or null if undefined. */
	bgFill: ComputedRef<string | null>;
} {
	const fillColor = computed(() => hexToRgba(props.color, props.opacity));
	const bgFill = computed(() => (props.bgColor ? hexToRgba(props.bgColor, props.bgOpacity) : null));

	return { fillColor, bgFill };
}
