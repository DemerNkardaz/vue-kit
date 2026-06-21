<script setup lang="ts">
import { computed } from 'vue';
import type { StripesProps } from './types';
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
  pxHandler: (val: number) => val,
});

const patternId = generatePatternId('stripes');

// Геометрия полос отличается от "клеточной" (нет borderRadius/rx),
// поэтому считается локально, а не через useCellGeometry.
const stripeGeometry = computed(() => {
  const stripeW = props.pxHandler(props.stripesPx);
  const gap = props.pxHandler(props.gapPx);
  const total = stripeW + gap;
  return { stripeW, gap, total };
});

const size = computed(() => ({
  w: resolveDimension(props.w, props.pxHandler),
  h: resolveDimension(props.h, props.pxHandler),
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
