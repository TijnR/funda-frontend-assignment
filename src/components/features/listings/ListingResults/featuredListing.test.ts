import { describe, expect, it } from "vitest";

import { FEATURED_PER_PAGE, getFeaturedListingIndices } from "./featuredListing";

/**
 * Replays the indices against the grid rules: strictly ascending, inside the page, and each
 * one preceded by an even number of regular cards so nothing is stranded beside a hole.
 */
function describeLayout(indices: ReadonlySet<number>, itemCount: number): string[] {
  const problems: string[] = [];
  let placed = 0;
  let previous = -1;

  for (const index of indices) {
    if (index <= previous) problems.push(`${index} does not follow ${previous}`);
    if (index < 0 || index >= itemCount)
      problems.push(`${index} is outside a page of ${itemCount}`);
    if ((index - placed) % 2 !== 0) problems.push(`${index} strands the card before it`);
    previous = index;
    placed++;
  }

  return problems;
}

describe("getFeaturedListingIndices", () => {
  it("lays out legally for any page length and highlight count", () => {
    for (let itemCount = 0; itemCount <= 60; itemCount++) {
      for (let featuredCount = 0; featuredCount <= 6; featuredCount++) {
        const indices = getFeaturedListingIndices(itemCount, featuredCount);

        expect(
          describeLayout(indices, itemCount),
          `${itemCount} items, ${featuredCount} featured`,
        ).toEqual([]);
      }
    }
  });

  it("spreads the featured cards down a full page", () => {
    expect([...getFeaturedListingIndices(25, 3)]).toEqual([6, 13, 18]);
  });

  it("keeps highlighting a short final page", () => {
    expect([...getFeaturedListingIndices(13)]).toEqual([2, 7, 10]);
  });

  it("highlights fewer cards rather than turning a tiny page into all banners", () => {
    expect(getFeaturedListingIndices(3).size).toBe(0);
    expect(getFeaturedListingIndices(6).size).toBe(1);
  });

  it("returns nothing for an empty page or when highlighting is off", () => {
    expect(getFeaturedListingIndices(0).size).toBe(0);
    expect(getFeaturedListingIndices(25, 0).size).toBe(0);
    expect(getFeaturedListingIndices(25, -1).size).toBe(0);
  });

  it("never features the preloaded first card", () => {
    for (let itemCount = 1; itemCount <= 60; itemCount++) {
      expect(getFeaturedListingIndices(itemCount).has(0)).toBe(false);
    }
  });

  it("defaults to the configured count on a full page", () => {
    expect(getFeaturedListingIndices(25).size).toBe(FEATURED_PER_PAGE);
  });
});
