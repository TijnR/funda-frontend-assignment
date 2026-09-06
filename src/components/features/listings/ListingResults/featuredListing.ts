export const FEATURED_PER_PAGE = 3;
const GRID_COLUMNS = 2;

export function getFeaturedListingIndices(
  itemCount: number,
  featuredCount: number = FEATURED_PER_PAGE,
): ReadonlySet<number> {
  const regularCount = Math.max(itemCount - featuredCount, 0);
  const rowCount = Math.floor(regularCount / GRID_COLUMNS);

  // Each full-width card needs at least one complete row of regular cards ahead of it, so a
  // short final page quietly highlights fewer of them instead of turning into all banners.
  const highlightCount = Math.max(Math.min(featuredCount, rowCount), 0);

  return new Set(
    Array.from({ length: highlightCount }, (_, index) => {
      const nth = index + 1;
      const rowsBefore = Math.max(Math.round((nth * rowCount) / (highlightCount + 1)), 1);

      return rowsBefore * GRID_COLUMNS + index;
    }),
  );
}
