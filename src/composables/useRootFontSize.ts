import { ref } from 'vue';

/**
 * Retrieves the current root element font size (usually defined on `<html>`).
 * Returns a fallback of 16 if the environment does not support DOM access.
 * @returns {number} The current root font size in pixels.
 */
function getRootFontSize(): number {
	if (typeof document === 'undefined') return 16;
	return parseFloat(getComputedStyle(document.documentElement).fontSize);
}

/**
 * A reactive reference to the current root font size,
 * used to trigger updates across the application when the browser resizes.
 */
export const rootFontSize = ref<number>(getRootFontSize());

/**
 * Synchronizes the `rootFontSize` reference with the current DOM value.
 */
export function updateRootFontSize(): void {
	rootFontSize.value = getRootFontSize();
}

/**
 * Creates a resize handler wrapper that triggers an optional custom callback
 * and updates the global `rootFontSize` reference.
 * @param onResize - An optional callback to execute when a resize event occurs.
 * @returns {() => void} The handler function for the `resize` event.
 */
export function createRootFontSizeResizeHandler(onResize?: () => void): () => void {
	return () => {
		onResize?.();
		updateRootFontSize();
	};
}

/**
 * Tracks the current active listener to prevent memory leaks and multiple attachments.
 */
let attachedHandler: (() => void) | null = null;

/**
 * Ensures a singleton `resize` listener is attached to the window to track
 * changes in the root font size, which is critical for fluid typography and scaling.
 * @param onResize - An optional secondary callback to execute on resize.
 */
export function ensureRootFontSizeListener(onResize?: () => void): void {
	if (typeof window === 'undefined') return;

	const handler = createRootFontSizeResizeHandler(onResize);

	if (attachedHandler) {
		window.removeEventListener('resize', attachedHandler);
	}

	// Trigger once on initialization to capture the current state
	handler();
	window.addEventListener('resize', handler);
	attachedHandler = handler;
}
