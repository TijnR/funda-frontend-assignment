import { describe, expect, it } from "vitest";

import { mapListingsResponse, mapListingSummary } from "./mappers";
import type { RawListingsResponse, RawListingSummary } from "./schemas";

const rawListing: RawListingSummary = {
  AantalKamers: 4,
  Adres: "Keizersgracht 1",
  FotoLargest: "http://cloud.funda.nl/valentina_media/largest.jpg",
  Id: "abc-123",
  Koopprijs: 475000,
  Perceeloppervlakte: 120,
  Postcode: "1015 CJ",
  Woonoppervlakte: 98,
  Woonplaats: "Amsterdam",
};

describe("mapListingSummary", () => {
  it("maps the feed's Dutch field names onto the view model", () => {
    expect(mapListingSummary(rawListing)).toEqual({
      id: "abc-123",
      address: "Keizersgracht 1",
      city: "Amsterdam",
      postcode: "1015 CJ",
      price: 475000,
      livingArea: 98,
      rooms: 4,
      plotArea: 120,
      image: {
        url: "https://cloud.funda.nl/valentina_media/largest.jpg",
        width: 922,
        height: 615,
      },
    });
  });

  it("returns a listing without an image rather than a broken one", () => {
    expect(mapListingSummary({ ...rawListing, FotoLargest: null })?.image).toBeNull();
  });

  it("drops a listing that has no id", () => {
    expect(mapListingSummary({ ...rawListing, Id: null })).toBeNull();
  });
});

describe("mapListingsResponse", () => {
  it("carries paging through and filters unusable listings", () => {
    const response = {
      Objects: [rawListing, { ...rawListing, Id: null }],
      Paging: { AantalPaginas: 12, HuidigePagina: 3 },
      TotaalAantalObjecten: 173,
    } as RawListingsResponse;

    expect(mapListingsResponse(response)).toMatchObject({ page: 3, pageCount: 12, total: 173 });
    expect(mapListingsResponse(response).items).toHaveLength(1);
  });
});
