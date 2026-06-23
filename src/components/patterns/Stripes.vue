<script lang="ts">
/**
 * The `Stripes` component renders a repeating diagonal or linear stripe pattern
 * within an SVG container. It is highly customizable, supporting adaptive scaling,
 * adjustable stripe thickness, gaps, and rotation angles.
 *
 * @component
 * @example
 * Basic usage with default settings
 *
 * ```vue
 * <Stripes />
 * ```
 *
 * @example
 * Customizing stripe dimensions and rotation
 *
 * ```vue
 * <Stripes
 * :stripesPx="2"
 * :gapPx="6"
 * :angle="45"
 * color="#3498db"
 * opacity="0.8"
 * />
 * ```
 */
export default {};
</script>

<script setup lang="ts">
import { computed } from 'vue';
import type { StripesProps } from './types';
import { useVueKit } from '@/inject';
import { useShapeFill } from '@/composables/useShapeFill';
import { resolveDimension } from '@/utils/dimension';
import { generatePatternId } from '@/utils/patternId';
import PatternSvgBase from './PatternSvgBase.vue';

type Props = StripesProps;

const props = withDefaults(defineProps<Props>(), {
  stripesPx: 1,
  gapPx: 4,
  angle: 45,
  w: '100%',
  h: '100%',
  color: '#eeeeee',
  opacity: 1,
  bgColor: undefined,
  bgOpacity: 1,
  pxHandler: undefined,
});

const { pxHandler: injectedPxHandler } = useVueKit();
const pxHandler = computed(() => props.pxHandler ?? injectedPxHandler);

const patternId = generatePatternId('stripes');

const stripeGeometry = computed(() => {
  const stripeW = pxHandler.value(props.stripesPx);
  const gap = pxHandler.value(props.gapPx);
  const total = stripeW + gap;
  return { stripeW, gap, total };
});

const size = computed(() => ({
  w: resolveDimension(props.w, pxHandler.value),
  h: resolveDimension(props.h, pxHandler.value),
}));

const { fillColor: strokeColor, bgFill } = useShapeFill(props);

const svgStyle = computed(() =>
  typeof props.w === 'number' || typeof props.h === 'number'
    ? { display: 'block', flexShrink: 0, width: size.value.w, height: size.value.h }
    : undefined
);
</script>

<template>
  <PatternSvgBase
    :width="size.w"
    :height="size.h"
    :pattern-id="patternId"
    :pattern-width="stripeGeometry.total"
    :pattern-height="stripeGeometry.total"
    :pattern-transform="`rotate(${props.angle})`"
    :bg-fill="bgFill"
    :svg-style="svgStyle"
  >
    <line
      x1="0"
      y1="0"
      x2="0"
      :y2="stripeGeometry.total"
      :stroke="strokeColor"
      :stroke-width="stripeGeometry.stripeW"
    />
  </PatternSvgBase>
</template>
