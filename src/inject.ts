import { inject } from 'vue';
import type { VueKitContext } from '@/types/common';
import { VUE_KIT_KEY } from './constants';
import { defaultVueKitContext } from './plugin';

export function useVueKit(): VueKitContext {
	const ctx = inject<VueKitContext>(VUE_KIT_KEY);

	if (!ctx) {
		return defaultVueKitContext;
	}

	return ctx;
}
