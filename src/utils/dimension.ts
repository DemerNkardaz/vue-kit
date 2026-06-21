import type { PxHandler } from '../components/patterns/types';

/**
 * Преобразует числовое значение размера в px-строку через pxHandler,
 * либо возвращает строку как есть (например, '100%').
 *
 * Используется там, где размер не обязан попадать в сетку паттерна
 * (Quads, Stripes).
 */
export function resolveDimension(val: number | string, pxHandler: PxHandler): string {
  if (typeof val === 'number') {
    return `${pxHandler(val)}px`;
  }
  return val;
}

/**
 * Аналогично resolveDimension, но "растягивает" числовое значение до
 * ближайшего кратного `step`, чтобы паттерн не обрезался по краю
 * контейнера (Checkboard, QuadsGrid).
 */
export function resolveSnappedDimension(
  val: number | string,
  pxHandler: PxHandler,
  step: number,
): string {
  if (typeof val === 'number') {
    const fluidVal = pxHandler(val);
    const stretched = Math.ceil(fluidVal / step) * step;
    return `${stretched}px`;
  }
  return val;
}
