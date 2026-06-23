<script lang="ts">
/**
 * The `FrameOutline` component renders a configurable outline frame.
 * It supports two modes: 'full' (a rectangular frame) or 'direction' (a cross-like structure
 * extending from a central axis). It allows precise control over side lengths,
 * thickness, and corner rounding.
 *
 * @component
 * @example
 * Render a full rectangular frame
 * ```vue
 * <FrameOutline
 * :length="100"
 * :thicknessPx="4"
 * color="#3498db"
 * />
 * ```
 *
 * @example
 * Render a cross-shaped outline extending from the center
 * ```vue
 * <FrameOutline
 * :directions="['top', 'bottom', 'left', 'right']"
 * :lengthTop="50"
 * :lengthLeft="50"
 * thicknessPx="2"
 * color="#2ecc71"
 * />
 * ```
 */
export default {};
</script>

<script setup lang="ts">
import { computed } from 'vue';
import type { Direction, FrameOutlineProps } from './types';
import { useVueKit } from '@/inject';
import { useShapeFill } from '@/composables/useShapeFill';

type Props = FrameOutlineProps;

const props = withDefaults(defineProps<Props>(), {
  thicknessPx: 2,
  color: '#fff',
  opacity: 1,
  bgColor: undefined,
  bgOpacity: 1,
  borderRadius: 0,
  directions: 'full',
  length: 40,
  lengthTop: undefined,
  lengthRight: undefined,
  lengthBottom: undefined,
  lengthLeft: undefined,
  pxHandler: undefined,
});

const { pxHandler: injectedPxHandler } = useVueKit();
const pxHandler = computed(() => props.pxHandler ?? injectedPxHandler);

function resolveLength(val: number | string | undefined, fallback: number | string): number {
  const v = val ?? fallback;
  if (typeof v === 'number') return pxHandler.value(v);
  return parseFloat(v);
}

const { fillColor, bgFill } = useShapeFill(props);

const t = computed(() => pxHandler.value(props.thicknessPx));
const rx = computed(() => pxHandler.value(props.borderRadius));

// Длины для каждой стороны в px (уже fluid)
const lengths = computed(() => ({
  top: resolveLength(props.lengthTop, props.length),
  right: resolveLength(props.lengthRight, props.length),
  bottom: resolveLength(props.lengthBottom, props.length),
  left: resolveLength(props.lengthLeft, props.length),
}));

const isFull = computed(() => props.directions === 'full');

const fullSize = computed(() => {
  if (!isFull.value) return { w: 0, h: 0 };
  return {
    w: Math.max(lengths.value.top, lengths.value.bottom),
    h: Math.max(lengths.value.left, lengths.value.right),
  };
});

const fullRects = computed(() => {
  if (!isFull.value) return [];
  const { w, h } = fullSize.value;
  const th = t.value;
  const { top, right, bottom, left } = lengths.value;
  const rr = rx.value;

  return [
    // top bar
    { x: 0, y: 0, width: top, height: th, rx: rr },
    // right bar
    { x: w - th, y: 0, width: th, height: right, rx: rr },
    // bottom bar
    { x: w - bottom, y: h - th, width: bottom, height: th, rx: rr },
    // left bar
    { x: 0, y: h - left, width: th, height: left, rx: rr },
  ];
});

// --- DIRECTION MODE ---
// Полосы исходят из центральной точки (оси).
// SVG размер: охватывает всё пространство полос + толщину.
const dirs = computed<Direction[]>(() => {
  if (isFull.value) return [];
  return props.directions as Direction[];
});

const hasDir = (d: Direction) => dirs.value.includes(d);

const dirSize = computed<{
  w: number;
  h: number;
  leftLen: number;
  rightLen: number;
  topLen: number;
  bottomLen: number;
}>(() => {
  const { top, right, bottom, left } = lengths.value;
  const th = t.value;

  const leftLen = hasDir('left') ? left : 0;
  const rightLen = hasDir('right') ? right : 0;
  const topLen = hasDir('top') ? top : 0;
  const bottomLen = hasDir('bottom') ? bottom : 0;

  const w = leftLen + rightLen + th;
  const h = topLen + bottomLen + th;

  return { w, h, leftLen, rightLen, topLen, bottomLen };
});

// Центральная точка (ось) — пересечение всех полос
const axis = computed(() => {
  const { leftLen, topLen } = dirSize.value;
  return { x: leftLen, y: topLen };
});

// Rects для direction mode
const dirRects = computed(() => {
  const { x: ax, y: ay } = axis.value;
  const { leftLen, topLen } = dirSize.value;
  const th = t.value;
  const { top, right, bottom, left } = lengths.value;
  const rr = rx.value;
  const rects = [];

  // Ось — всегда закрашенный квадрат th×th в точке пересечения
  rects.push({ x: ax, y: ay, width: th, height: th, rx: rr });

  if (hasDir('top')) rects.push({ x: ax, y: ay - topLen, width: th, height: top, rx: rr });
  if (hasDir('bottom')) rects.push({ x: ax, y: ay + th, width: th, height: bottom, rx: rr });
  if (hasDir('left')) rects.push({ x: ax - leftLen, y: ay, width: left, height: th, rx: rr });
  if (hasDir('right')) rects.push({ x: ax + th, y: ay, width: right, height: th, rx: rr });

  return rects;
});

const svgW = computed(() => (isFull.value ? fullSize.value.w : dirSize.value.w));
const svgH = computed(() => (isFull.value ? fullSize.value.h : dirSize.value.h));

const allRects = computed(() => (isFull.value ? fullRects.value : dirRects.value));
</script>

<template>
  <svg
    :width="svgW"
    :height="svgH"
    xmlns="http://www.w3.org/2000/svg"
    :style="{ display: 'block', flexShrink: 0, width: `${svgW}px`, height: `${svgH}px` }"
  >
    <rect v-if="bgFill" width="100%" height="100%" :fill="bgFill" />
    <rect
      v-for="(r, i) in allRects"
      :key="i"
      :x="r.x"
      :y="r.y"
      :width="r.width"
      :height="r.height"
      :fill="fillColor"
      :rx="r.rx"
      :ry="r.rx"
    />
  </svg>
</template>
