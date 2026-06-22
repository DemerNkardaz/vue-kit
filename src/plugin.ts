import type { App, Plugin } from 'vue';
import type { VueKitContext, VueKitOptions } from './types/common';
import { VUE_KIT_KEY } from './constants';
import { createFluidPxHandler, defPxHandler } from './utils/relative';
import {
	rootFontSize,
	updateRootFontSize,
	ensureRootFontSizeListener,
} from './composables/useRootFontSize';
import type { PxHandler } from './types/shared';

export const VueKitPlugin: Plugin = {
	install(app: App, options: VueKitOptions = {}) {
		ensureRootFontSizeListener();

		const baseFontScale = options.baseFontScale ?? 16;
		const fontScale = options.fontScale ?? rootFontSize;

		const pxHandler: PxHandler = function (px: number): number {
			if (options.pxHandler) {
				if (typeof options.pxHandler === 'string' && options.pxHandler == 'createFluidPxHandler') {
					return createFluidPxHandler(baseFontScale, fontScale)(px);
				}

				return options.pxHandler(px);
			}
			return defPxHandler(px);
		};

		const rootFontSizeUpdater = options.rootFontSizeUpdater ?? updateRootFontSize;

		const config: VueKitContext = {
			fontScale,
			baseFontScale,
			pxHandler,
			rootFontSizeUpdater,
		};

		app.provide(VUE_KIT_KEY, config);
	},
};

export const defaultVueKitContext: VueKitContext = {
	fontScale: rootFontSize,
	baseFontScale: 16,
	pxHandler: defPxHandler,
	rootFontSizeUpdater: updateRootFontSize,
};
