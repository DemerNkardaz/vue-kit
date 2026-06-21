import { computed, type ComputedRef } from 'vue';
import { hexToRgba } from '../utils/color';

export interface ShapeFillProps {
	color: string;
	opacity: number;
	bgColor?: string;
	bgOpacity: number;
}

/**
 * Считает цвет заливки/обводки фигуры и (опционально) цвет фона.
 *
 * Не привязан к "паттернам" — общая логика для любого SVG-компонента
 * с цветной фигурой и опциональным фоном (используется и в
 * components/patterns/*, и в components/primitives/*).
 */
export function useShapeFill(props: ShapeFillProps): {
	fillColor: ComputedRef<string>;
	bgFill: ComputedRef<string | null>;
} {
	const fillColor = computed(() => hexToRgba(props.color, props.opacity));
	const bgFill = computed(() => (props.bgColor ? hexToRgba(props.bgColor, props.bgOpacity) : null));

	return { fillColor, bgFill };
}
