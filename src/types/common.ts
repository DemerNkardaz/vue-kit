import type { Ref } from 'vue';
import type { PxHandler } from './shared';

export interface ScaleRefs {
	fontScale: Ref<number> | number;
	baseFontScale: Ref<number> | number;
}

export type PxHandlerFactory = (scale: ScaleRefs) => PxHandler;

export interface VueKitOptions {
	fontScale?: Ref<number> | number;
	baseFontScale?: Ref<number> | number;
	pxHandler?: PxHandler;
	pxHandlerFactory?: PxHandlerFactory;
	rootFontSizeUpdater?: () => void;
}

export interface VueKitContext {
	fontScale: Ref<number> | number;
	baseFontScale: Ref<number> | number;
	pxHandler: PxHandler;
	rootFontSizeUpdater: () => void;
}
