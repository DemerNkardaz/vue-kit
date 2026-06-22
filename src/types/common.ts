import type { Ref } from 'vue';
import type { PxHandler } from './shared';

export interface VueKitOptions {
	fontScale?: Ref<number> | number;
	baseFontScale?: number;
	pxHandler?: PxHandler;
	rootFontSizeUpdater?: () => void;
}

export type VueKitContext = Required<VueKitOptions>;
