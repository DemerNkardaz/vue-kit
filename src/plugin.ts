import type { App, Plugin } from 'vue';
import type { VueKitContext, VueKitOptions } from './types/common';
import { VUE_KIT_KEY } from './constants';
import { defPxHandler } from './utils/relative';
import {
	rootFontSize,
	updateRootFontSize,
	ensureRootFontSizeListener,
} from './composables/useRootFontSize';
import type { PxHandler } from './types/shared';

export const VueKitPlugin: Plugin<[options?: VueKitOptions]> = {
	install(app: App, options: VueKitOptions = {}) {
		ensureRootFontSizeListener();

		const baseFontScale = options.baseFontScale ?? 16;
		const fontScale = options.fontScale ?? rootFontSize;

		const pxHandler: PxHandler = options.pxHandler
			? options.pxHandler
			: options.pxHandlerFactory
				? options.pxHandlerFactory({ fontScale, baseFontScale })
				: defPxHandler;

		const rootFontSizeUpdater = options.rootFontSizeUpdater ?? updateRootFontSize;

		app.provide(VUE_KIT_KEY, {
			fontScale,
			baseFontScale,
			pxHandler,
			rootFontSizeUpdater,
		});
	},
};

export const defaultVueKitContext: VueKitContext = {
	fontScale: rootFontSize,
	baseFontScale: 16,
	pxHandler: defPxHandler,
	rootFontSizeUpdater: updateRootFontSize,
};
