<script lang="ts">
/**
 * The `Squares` component renders a structured grid of rectangles (quads).
 * The layout of filled cells is determined by row or column specifications.
 *
 * @component
 * @example
 * Basic usage with a 3x3 grid layout defined by rows
 * ```vue
 * <Squares
 * :row="[1, 2, 3]"
 * :count="3"
 * :sizePx="20"
 * :gapPx="4"
 * color="#3498db"
 * />
 * ```
 *
 * @example
 * Advanced usage with border radius and background color
 * ```vue
 * <Squares
 * :col="[[1, 3], 2]"
 * :count="5"
 * :sizePx="16"
 * borderRadius="25%"
 * color="#e74c3c"
 * bgColor="#f0f0f0"
 * />
 * ```
 */
export default {};
</script>

<script setup lang="ts">
import { computed } from 'vue';
import type { QuadsProps } from './types';
import { useVueKit } from '@/inject';
import { useCellGeometry } from '@/composables/useCellGeometry';
import { useShapeFill } from '@/composables/useShapeFill';
import { resolveDimension } from '@/utils/dimension';

type Props = QuadsProps;

const props = withDefaults(defineProps<Props>(), {
  sizePx: 10,
  gapPx: 2,
  color: '#fff',
  opacity: 1,
  bgColor: undefined,
  bgOpacity: 1,
  borderRadius: 0,
  row: undefined,
  col: undefined,
  count: 1,
  w: undefined,
  h: undefined,
  pxHandler: undefined,
});

const { pxHandler: injectedPxHandler } = useVueKit();
const pxHandler = computed(() => props.pxHandler ?? injectedPxHandler);

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

// Какие клетки сетки закрашены — специфично только для Quads,
// поэтому не выносится в общий composable.
const filledCells = computed<Set<string>>(() => {
  const set = new Set<string>();
  const { row, col } = props;

  if (row) {
    row.forEach((spec, rowIdx) => {
      if (spec === 0) return;
      if (Array.isArray(spec)) {
        spec.forEach((c) => set.add(`${c - 1},${rowIdx}`));
      } else {
        for (let c = 0; c < spec; c++) set.add(`${c},${rowIdx}`);
      }
    });
  } else if (col) {
    col.forEach((spec, colIdx) => {
      if (spec === 0) return;
      if (Array.isArray(spec)) {
        spec.forEach((r) => set.add(`${colIdx},${r - 1}`));
      } else {
        for (let r = 0; r < spec; r++) set.add(`${colIdx},${r}`);
      }
    });
  }

  return set;
});

const gridSize = computed(() => {
  const { row, col, count } = props;
  if (row) return { cols: count, rows: row.length };
  if (col) return { cols: col.length, rows: count };
  return { cols: 0, rows: 0 };
});

const svgSize = computed(() => {
  const { total, gap } = geometry.value;
  const { cols, rows } = gridSize.value;
  const w = cols > 0 ? cols * total - gap : 0;
  const h = rows > 0 ? rows * total - gap : 0;
  return { w, h };
});

const domSize = computed(() => ({
  w: props.w !== undefined ? resolveDimension(props.w, pxHandler.value) : `${svgSize.value.w}px`,
  h: props.h !== undefined ? resolveDimension(props.h, pxHandler.value) : `${svgSize.value.h}px`,
}));

const { fillColor, bgFill } = useShapeFill(props);
</script>

<template>
  <div
    :style="{
      display: 'block',
      flexShrink: 0,
      width: domSize.w,
      height: domSize.h,
      overflow: 'hidden',
    }"
  >
    <svg
      :width="svgSize.w"
      :height="svgSize.h"
      xmlns="http://www.w3.org/2000/svg"
      :style="{ display: 'block', width: `${svgSize.w}px`, height: `${svgSize.h}px` }"
    >
      <rect v-if="bgFill" width="100%" height="100%" :fill="bgFill" />
      <template v-for="rowIdx in gridSize.rows" :key="rowIdx">
        <template v-for="colIdx in gridSize.cols" :key="colIdx">
          <rect
            v-if="filledCells.has(`${colIdx - 1},${rowIdx - 1}`)"
            :x="(colIdx - 1) * geometry.total"
            :y="(rowIdx - 1) * geometry.total"
            :width="geometry.cell"
            :height="geometry.cell"
            :fill="fillColor"
            :rx="geometry.rx"
            :ry="geometry.rx"
          />
        </template>
      </template>
    </svg>
  </div>
</template>
