<script lang="ts">
/**
 * The `Checkboard` component renders a repeating checkerboard grid pattern
 * within an SVG container. It manages cell dimensions, gaps, and corner rounding.
 *
 * @component
 * @example
 * Basic usage
 * ```vue
 * <Checkboard color="#ccc" />
 * ```
 *
 * @example
 * Pattern with custom cell size and corner rounding
 * ```vue
 * <Checkboard
 * :sizePx="10"
 * :gapPx="2"
 * borderRadius="4px"
 * color="#2c3e50"
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

const svgStyle = computed(() =>
  size.value.w !== '100%' || size.value.h !== '100%'
    ? { display: 'block', flexShrink: 0 }
    : undefined
);
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
