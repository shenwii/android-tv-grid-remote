import { BUILT_IN_ELEMENTS } from '../constants';
import type { ElementConfig, LayoutItem, LayoutRow } from '../types';

/**
 * Packs elements into grid rows based on `maxColumns`.
 * - Horizontal bar widgets (volume, media_controls, now_playing) have fixed height = 1 cell.
 * - Button-like elements, touch_pad, and spacer have height = width (rowUnits = colSpan).
 */
export function packElementsIntoRows(
  elements: ElementConfig[],
  maxColumns: number,
): LayoutRow[] {
  const safeMax = Math.max(1, Math.round(maxColumns || 4));
  const rows: LayoutRow[] = [];

  let currentItems: LayoutItem[] = [];
  let currentCols = 0;
  let currentMaxRowUnits = 1;

  for (const el of elements) {
    if (!el || !el.id) continue;
    const meta = BUILT_IN_ELEMENTS[el.id];
    const rawCols = el.columns ?? meta?.defaultColumns ?? 1;
    const colSpan = Math.max(1, Math.min(safeMax, Math.round(rawCols)));
    const isHorizontalBar = meta?.isHorizontalBar ?? false;
    const rowUnits = isHorizontalBar ? 1 : colSpan;

    if (currentItems.length > 0 && currentCols + colSpan > safeMax) {
      rows.push({
        items: currentItems,
        maxRowUnits: currentMaxRowUnits,
      });
      currentItems = [];
      currentCols = 0;
      currentMaxRowUnits = 1;
    }

    currentItems.push({
      config: el,
      colSpan,
      rowUnits,
      isHorizontalBar,
    });
    currentCols += colSpan;
    if (rowUnits > currentMaxRowUnits) {
      currentMaxRowUnits = rowUnits;
    }
  }

  if (currentItems.length > 0) {
    rows.push({
      items: currentItems,
      maxRowUnits: currentMaxRowUnits,
    });
  }

  return rows;
}
