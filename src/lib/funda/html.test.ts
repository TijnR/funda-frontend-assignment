import { describe, expect, it } from "vitest";

import { toPlainText } from "./html";

describe("toPlainText", () => {
  it("decodes the entities Funda uses for units and currency", () => {
    expect(toPlainText("151&nbsp;m&sup2;")).toBe("151 m²");
    expect(toPlainText("638&nbsp;m&sup3;")).toBe("638 m³");
    expect(toPlainText("&euro;&nbsp;0,0 /mnd")).toBe("€ 0,0 /mnd");
  });

  it("decodes numeric and hexadecimal references", () => {
    expect(toPlainText("caf&#233; &#x26; bar")).toBe("café & bar");
  });

  it("unwraps markup and collapses the whitespace it leaves behind", () => {
    expect(toPlainText('<span class="price-wrapper">€ 700.000 kosten koper</span>')).toBe(
      "€ 700.000 kosten koper",
    );
    expect(toPlainText("<strong>Gebruiksoppervlakten</strong>")).toBe("Gebruiksoppervlakten");
  });

  it("resolves Funda placeholders to their label", () => {
    expect(toPlainText("Dakisolatie, <{HR-glas}> en muurisolatie")).toBe(
      "Dakisolatie, HR-glas en muurisolatie",
    );
    expect(toPlainText("<[KoopPrijs]> <{kosten koper|lang}>")).toBe("kosten koper");
  });

  it("keeps escaped markup literal instead of reviving it", () => {
    expect(toPlainText("&lt;script&gt;alert(1)&lt;/script&gt;")).toBe("<script>alert(1)</script>");
  });

  it("leaves unknown entities untouched and handles empty input", () => {
    expect(toPlainText("R&D &fake; tests")).toBe("R&D &fake; tests");
    expect(toPlainText(null)).toBe("");
    expect(toPlainText("   ")).toBe("");
  });
});
