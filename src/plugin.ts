import type { App, Plugin } from 'vue';
import type { VueKitContext, VueKitOptions } from './types/common';
import { VUE_KIT_KEY } from './constants';
import { defPxHandler } from './utils/relative';
import { rootFontSize, ensureRootFontSizeListener } from './composables/useRootFontSize';
import type { PxHandler } from './types/shared';

/**
 * Global reference to the most recently initialized VueKit configuration.
 * Used for access outside of the Vue component tree.
 */
let lastConfig: VueKitContext | null = null;

/**
 * Vue plugin to initialize and provide the VueKit context to the application.
 * @example
 * ```ts
 * app.use(VueKitPlugin, { baseFontScale: 16 });
 * ```
 */
export const VueKitPlugin: Plugin<[options?: VueKitOptions]> = {
	/**
	 * Installs the plugin into the Vue application.
	 * @param app - The Vue application instance.
	 * @param options - Configuration options for sizing and scaling.
	 */
	install(app: App, options: VueKitOptions = {}) {
		const baseFontScale = options.baseFontScale ?? 16;
		const fontScale = options.fontScale ?? rootFontSize;

		const pxHandler: PxHandler = options.pxHandler
			? options.pxHandler
			: options.pxHandlerFactory
				? options.pxHandlerFactory({ fontScale, baseFontScale })
				: defPxHandler;

		if (options.onResize) ensureRootFontSizeListener(options.onResize);

		const config: VueKitContext = {
			fontScale,
			baseFontScale,
			pxHandler,
		};

		lastConfig = config;
		app.provide(VUE_KIT_KEY, config);
	},
};

/**
 * The fallback configuration used if the plugin has not been initialized
 * or if accessed outside of an injection context.
 */
export const defaultVueKitContext: VueKitContext = {
	fontScale: rootFontSize,
	baseFontScale: 16,
	pxHandler: defPxHandler,
};

/**
 * Retrieves the current VueKit configuration.
 * Returns the last initialized config via the plugin, or the default context.
 * @returns {VueKitContext} The active configuration object.
 */
export function getVueKitConfig(): VueKitContext {
	return lastConfig ?? defaultVueKitContext;
}
