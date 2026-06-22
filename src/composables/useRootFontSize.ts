import { ref } from 'vue';

function getRootFontSize(): number {
	if (typeof document === 'undefined') return 16;
	return parseFloat(getComputedStyle(document.documentElement).fontSize);
}

/**
 * Singleton-ref на корневой font-size — ровно как в legacy.
 * Модуль грузится один раз → ref создаётся один раз и общий для
 * всего приложения (а не пересоздаётся фабрикой при каждом install()).
 */
export const rootFontSize = ref<number>(getRootFontSize());

export function updateRootFontSize(): void {
	console.log('updateRootFontSize', getRootFontSize());
	rootFontSize.value = getRootFontSize();
}

let listenerAttached = false;

/**
 * Навешивает resize-листенер один раз, даже если VueKitPlugin.install()
 * вызовут несколько раз (несколько app на странице, HMR и т.п.).
 */
export function ensureRootFontSizeListener(): void {
	if (listenerAttached || typeof window === 'undefined') return;
	window.addEventListener('resize', updateRootFontSize);
	listenerAttached = true;
}
