import { describe, expect, it } from "vitest";

import { toHttpsUrl } from "./url";

describe("toHttpsUrl", () => {
  it("upgrades http to https", () => {
    expect(toHttpsUrl("http://cloud.funda.nl/a.jpg")).toBe("https://cloud.funda.nl/a.jpg");
  });

  it("leaves an https url alone", () => {
    expect(toHttpsUrl("https://cloud.funda.nl/a.jpg")).toBe("https://cloud.funda.nl/a.jpg");
  });

  it("returns null when there is no url", () => {
    expect(toHttpsUrl(undefined)).toBeNull();
    expect(toHttpsUrl("")).toBeNull();
  });
});
