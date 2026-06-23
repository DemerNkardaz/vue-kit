import type { InjectionKey } from 'vue';
import type { VueKitContext } from './types/common';

export const VUE_KIT_KEY: InjectionKey<VueKitContext> = Symbol('vue-kit');
