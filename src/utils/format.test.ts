import { describe, expect, it } from "vitest";

import { formatArea, formatPrice, parsePage } from "./format";

describe("formatPrice", () => {
  it("formats a price in Dutch euros without decimals", () => {
    expect(formatPrice(475000).replace(/ /gu, " ")).toBe("€ 475.000 k.k.");
  });

  it("falls back to a label when the feed omits the price", () => {
    expect(formatPrice(null)).toBe("Prijs op aanvraag");
  });
});

describe("formatArea", () => {
  it("formats square metres with a Dutch thousands separator", () => {
    expect(formatArea(1250)).toBe("1.250 m²");
  });
});

describe("parsePage", () => {
  it.each([
    ["3", 3],
    [undefined, 1],
    ["0", 1],
    ["-2", 1],
    ["abc", 1],
    ["1.5", 1],
    ["99999999999999999999", 1],
  ])("maps %s to page %i", (input, expected) => {
    expect(parsePage(input)).toBe(expected);
  });

  it("uses the first value when the param repeats", () => {
    expect(parsePage(["4", "9"])).toBe(4);
  });
});
