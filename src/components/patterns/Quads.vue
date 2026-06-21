<script setup lang="ts">
import { computed } from 'vue';
import type { QuadsProps } from './types';
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
  pxHandler: (val: number) => val,
});

const geometry = useCellGeometry(props);

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
  w: props.w !== undefined ? resolveDimension(props.w, props.pxHandler) : `${svgSize.value.w}px`,
  h: props.h !== undefined ? resolveDimension(props.h, props.pxHandler) : `${svgSize.value.h}px`,
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
