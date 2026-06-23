import type { Ref } from 'vue';
import type { PxHandler } from './shared';

/**
 * Represents the reactive or static references for font scaling parameters.
 */
export interface ScaleRefs {
	/** The current scale factor applied to fonts (reactive or static). */
	fontScale: Ref<number> | number;
	/** The base font size used for relative calculations (reactive or static). */
	baseFontScale: Ref<number> | number;
}

/**
 * A factory function type used to create a custom PxHandler based on current scale settings.
 * @param scale - The current font scaling references.
 * @returns An implementation of PxHandler.
 */
export type PxHandlerFactory = (scale: ScaleRefs) => PxHandler;

/**
 * Configuration options for initializing the VueKit plugin.
 */
export interface VueKitOptions {
	/** Optional override for the initial font scale. */
	fontScale?: Ref<number> | number;
	/** Optional override for the base font size. Defaults to 16. */
	baseFontScale?: Ref<number> | number;
	/** Custom handler for pixel unit conversion. */
	pxHandler?: PxHandler;
	/** Factory to generate a custom pixel handler based on provided scale refs. */
	pxHandlerFactory?: PxHandlerFactory;
	/** Optional callback function to be executed on window resize events. */
	onResize?: () => void;
}

/**
 * The core context object provided throughout the application via injection.
 */
export interface VueKitContext {
	/** The reactive or static font scale factor. */
	fontScale: Ref<number> | number;
	/** The reactive or static base font scale. */
	baseFontScale: Ref<number> | number;
	/** The resolved pixel conversion handler. */
	pxHandler: PxHandler;
}
