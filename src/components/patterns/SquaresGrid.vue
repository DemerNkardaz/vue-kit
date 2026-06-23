<script lang="ts">
/**
 * The `SquaresGrid` component renders a repeating square grid pattern within an SVG container.
 * It provides control over cell size, gaps between cells, and corner rounding.
 *
 * @component
 * @example
 * Basic usage with default settings
 * ```vue
 * <SquaresGrid color="#333" />
 * ```
 *
 * @example
 * Custom grid pattern with rounded corners
 * ```vue
 * <SquaresGrid
 * :sizePx="8"
 * :gapPx="2"
 * borderRadius="50%"
 * color="#2ecc71"
 * />
 * ```
 */
export default {};
</script>
<script setup lang="ts">
import { computed } from 'vue';
import type { PatternCellProps } from './types';
import { useVueKit } from '@/inject';
import { useCellGeometry } from '@/composables/useCellGeometry';
import { useShapeFill } from '@/composables/useShapeFill';
import { resolveSnappedDimension } from '@/utils/dimension';
import { generatePatternId } from '@/utils/patternId';
import PatternSvgBase from './PatternSvgBase.vue';

type Props = PatternCellProps;

const props = withDefaults(defineProps<Props>(), {
  sizePx: 4,
  gapPx: 1,
  color: '#fff',
  opacity: 1,
  bgColor: undefined,
  bgOpacity: 1,
  borderRadius: 0,
  w: '100%',
  h: '100%',
  pxHandler: undefined,
});

const { pxHandler: injectedPxHandler } = useVueKit();
const pxHandler = computed(() => props.pxHandler ?? injectedPxHandler);

const patternId = generatePatternId('squares');

const geometry = useCellGeometry({
  get sizePx() {
    return props.sizePx;
  },
  get gapPx() {
    return props.gapPx;
  },
  get borderRadius() {
    return props.borderRadius;
  },
  get pxHandler() {
    return pxHandler.value;
  },
});

const size = computed(() => ({
  w: resolveSnappedDimension(props.w, pxHandler.value, geometry.value.total),
  h: resolveSnappedDimension(props.h, pxHandler.value, geometry.value.total),
}));

const { fillColor, bgFill } = useShapeFill(props);

// В отличие от Checkboard, здесь стиль с фиксированными width/height
// навешивается всегда — сохраняем оригинальное поведение QuadsGrid.
const svgStyle = computed(() => ({
  display: 'block',
  flexShrink: 0,
  width: size.value.w,
  height: size.value.h,
}));
</script>

<template>
  <PatternSvgBase
    :width="size.w"
    :height="size.h"
    :pattern-id="patternId"
    :pattern-width="geometry.total"
    :pattern-height="geometry.total"
    :bg-fill="bgFill"
    :svg-style="svgStyle"
  >
    <rect
      :x="geometry.gap / 2"
      :y="geometry.gap / 2"
      :width="geometry.cell"
      :height="geometry.cell"
      :fill="fillColor"
      :rx="geometry.rx"
      :ry="geometry.rx"
    />
  </PatternSvgBase>
</template>
