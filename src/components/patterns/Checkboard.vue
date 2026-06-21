<script setup lang="ts">
import { computed } from 'vue';
import type { PatternCellProps } from './types';
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
  pxHandler: (val: number) => val,
});

const patternId = generatePatternId('squares');

const geometry = useCellGeometry(props);

const size = computed(() => ({
  w: resolveSnappedDimension(props.w, props.pxHandler, geometry.value.total),
  h: resolveSnappedDimension(props.h, props.pxHandler, geometry.value.total),
}));

const { fillColor, bgFill } = useShapeFill(props);

// Стиль навешивается только тогда, когда контейнер не "тянется" на 100% —
// сохраняем оригинальное поведение Checkboard (в отличие от QuadsGrid).
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
