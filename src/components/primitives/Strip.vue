<script setup lang="ts">
import { computed } from 'vue';
import type { StripProps } from './types';
import { useVueKit } from '@/inject';
import { hexToRgba } from '@/utils/color';
import { resolveDimension } from '@/utils/dimension';

type Props = StripProps;

const props = withDefaults(defineProps<Props>(), {
  w: undefined,
  h: undefined,
  stripW: 100,
  stripH: 10,
  color: '#fff',
  opacity: 1,
  borderRadius: 0,
  cornerTopLeft: () => [0, 0],
  cornerTopRight: () => [0, 0],
  cornerBottomRight: () => [0, 0],
  cornerBottomLeft: () => [0, 0],
  pxHandler: undefined,
});

const { pxHandler: injectedPxHandler } = useVueKit();
const pxHandler = computed(() => props.pxHandler ?? injectedPxHandler);

// У Strip нет понятия фона (bgColor/bgOpacity), поэтому здесь не нужен
// useShapeFill — он считает ещё и bgFill, который Strip не использует.
const fillColor = computed(() => hexToRgba(props.color, props.opacity));

const baseStripSize = computed(() => ({
  w: typeof props.stripW === 'number' ? props.stripW : 100,
  h: typeof props.stripH === 'number' ? props.stripH : 10,
}));

const domSize = computed(() => ({
  w:
    props.w !== undefined
      ? resolveDimension(props.w, pxHandler.value)
      : resolveDimension(props.stripW, pxHandler.value),
  h:
    props.h !== undefined
      ? resolveDimension(props.h, pxHandler.value)
      : resolveDimension(props.stripH, pxHandler.value),
}));

const corners = computed(() => {
  const { w, h } = baseStripSize.value;
  const [tlx, tly] = props.cornerTopLeft;
  const [trx, try_] = props.cornerTopRight;
  const [brx, bry] = props.cornerBottomRight;
  const [blx, bly] = props.cornerBottomLeft;

  return {
    TL: { x: pxHandler.value(0 + tlx), y: pxHandler.value(0 + tly) },
    TR: { x: pxHandler.value(w + trx), y: pxHandler.value(0 + try_) },
    BR: { x: pxHandler.value(w + brx), y: pxHandler.value(h + bry) },
    BL: { x: pxHandler.value(0 + blx), y: pxHandler.value(h + bly) },
  };
});

const viewBox = computed(() => {
  const { TL, TR, BR, BL } = corners.value;
  const xs = [TL.x, TR.x, BR.x, BL.x];
  const ys = [TL.y, TR.y, BR.y, BL.y];
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  const maxX = Math.max(...xs);
  const maxY = Math.max(...ys);
  return { minX, minY, w: maxX - minX, h: maxY - minY };
});

const svgSize = computed(() => ({
  w: viewBox.value.w,
  h: viewBox.value.h,
}));

const pathD = computed(() => {
  const { TL, TR, BR, BL } = corners.value;
  const { minX, minY } = viewBox.value;
  const r = pxHandler.value(props.borderRadius);

  const tl = { x: TL.x - minX, y: TL.y - minY };
  const tr = { x: TR.x - minX, y: TR.y - minY };
  const br = { x: BR.x - minX, y: BR.y - minY };
  const bl = { x: BL.x - minX, y: BL.y - minY };

  if (r === 0) {
    return `M ${tl.x} ${tl.y} L ${tr.x} ${tr.y} L ${br.x} ${br.y} L ${bl.x} ${bl.y} Z`;
  }

  const norm = (from: { x: number; y: number }, to: { x: number; y: number }) => {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const len = Math.sqrt(dx * dx + dy * dy);
    return { x: dx / len, y: dy / len };
  };

  const arc = (
    corner: { x: number; y: number },
    prev: { x: number; y: number },
    next: { x: number; y: number }
  ) => {
    const fromDir = norm(corner, prev);
    const toDir = norm(corner, next);
    const start = { x: corner.x + fromDir.x * r, y: corner.y + fromDir.y * r };
    const end = { x: corner.x + toDir.x * r, y: corner.y + toDir.y * r };
    const cross = fromDir.x * toDir.y - fromDir.y * toDir.x;
    const sweep = cross > 0 ? 1 : 0;
    return { start, end, sweep };
  };

  const a_tl = arc(tl, bl, tr);
  const a_tr = arc(tr, tl, br);
  const a_br = arc(br, tr, bl);
  const a_bl = arc(bl, br, tl);

  return [
    `M ${a_tl.end.x} ${a_tl.end.y}`,
    `L ${a_tr.start.x} ${a_tr.start.y}`,
    `A ${r} ${r} 0 0 ${a_tr.sweep} ${a_tr.end.x} ${a_tr.end.y}`,
    `L ${a_br.start.x} ${a_br.start.y}`,
    `A ${r} ${r} 0 0 ${a_br.sweep} ${a_br.end.x} ${a_br.end.y}`,
    `L ${a_bl.start.x} ${a_bl.start.y}`,
    `A ${r} ${r} 0 0 ${a_bl.sweep} ${a_bl.end.x} ${a_bl.end.y}`,
    `L ${a_tl.start.x} ${a_tl.start.y}`,
    `A ${r} ${r} 0 0 ${a_tl.sweep} ${a_tl.end.x} ${a_tl.end.y}`,
    `Z`,
  ].join(' ');
});
</script>

<template>
  <div :style="{ display: 'block', flexShrink: 0, width: domSize.w, height: domSize.h }">
    <svg
      :width="svgSize.w"
      :height="svgSize.h"
      :viewBox="`0 0 ${svgSize.w} ${svgSize.h}`"
      xmlns="http://www.w3.org/2000/svg"
      :style="{
        display: 'block',
        width: `${svgSize.w}px`,
        height: `${svgSize.h}px`,
        overflow: 'visible',
      }"
    >
      <path :d="pathD" :fill="fillColor" />
    </svg>
  </div>
</template>
