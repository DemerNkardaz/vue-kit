import { inject } from 'vue';
import type { VueKitContext } from '@/types/common';
import { VUE_KIT_KEY } from './constants';
import { defaultVueKitContext } from './plugin';

/**
 * A composable function that provides access to the VueKit configuration.
 *
 * It attempts to retrieve the configuration provided by the `VueKitPlugin`
 * via Vue‘s dependency injection system. If the plugin has not been installed,
 * it returns the `defaultVueKitContext` as a fallback.
 * @returns {VueKitContext} The active VueKit configuration object.
 * @example
 * ```ts
 * const { fontScale, pxHandler } = useVueKit();
 * ```
 */
export function useVueKit(): VueKitContext {
	const ctx = inject<VueKitContext>(VUE_KIT_KEY);

	if (!ctx) {
		return defaultVueKitContext;
	}

	return ctx;
}
