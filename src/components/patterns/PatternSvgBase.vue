<script setup lang="ts">
import type { CSSProperties } from 'vue';

interface Props {
  width: string;
  height: string;
  patternId: string;
  patternWidth: number;
  patternHeight: number;
  patternTransform?: string;
  bgFill?: string | null;
  svgStyle?: CSSProperties;
}

defineProps<Props>();
</script>

<template>
  <svg :width="width" :height="height" xmlns="http://www.w3.org/2000/svg" :style="svgStyle">
    <defs>
      <pattern
        :id="patternId"
        patternUnits="userSpaceOnUse"
        :width="patternWidth"
        :height="patternHeight"
        :patternTransform="patternTransform"
      >
        <slot />
      </pattern>
    </defs>
    <rect v-if="bgFill" width="100%" height="100%" :fill="bgFill" />
    <rect width="100%" height="100%" :fill="`url(#${patternId})`" />
  </svg>
</template>
