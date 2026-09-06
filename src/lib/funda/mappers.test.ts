import { describe, expect, it } from "vitest";

import {
  mapFeatureGroups,
  mapListingDetail,
  mapListingsResponse,
  mapListingSummary,
  mapPhotos,
  normalizeListingUrl,
} from "./mappers";
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

const photoMedia = (indexNumbers: number[]) =>
  indexNumbers.map((IndexNumber) => ({
    Categorie: 1,
    ContentType: 1,
    IndexNumber,
    MediaItems: [{ Url: `http://cloud.funda.nl/${IndexNumber}.jpg`, Width: 900, Height: 600 }],
  }));

describe("mapPhotos", () => {
  it("keeps ordinary photos, ordered by index, at their largest size", () => {
    const photos = mapPhotos([
      {
        Categorie: 3,
        ContentType: 1,
        IndexNumber: 1,
        MediaItems: [{ Url: "http://cloud.funda.nl/brochure.jpg", Width: 1200, Height: 800 }],
      },
      {
        Categorie: 1,
        ContentType: 1,
        IndexNumber: 2,
        MediaItems: [
          { Url: "http://cloud.funda.nl/small.jpg", Width: 120, Height: 80 },
          { Url: "http://cloud.funda.nl/large.jpg", Width: 922, Height: 615 },
        ],
      },
    ]);

    expect(photos).toEqual([{ url: "https://cloud.funda.nl/large.jpg", width: 922, height: 615 }]);
  });

  it("preserves source descriptions and omits empty ones", () => {
    const photos = mapPhotos([
      {
        Categorie: 1,
        ContentType: 1,
        IndexNumber: 1,
        Omschrijving: "  Woonkamer met openslaande deuren  ",
        MediaItems: [{ Url: "https://cloud.funda.nl/room.jpg", Width: 1200, Height: 800 }],
      },
      {
        Categorie: 1,
        ContentType: 1,
        IndexNumber: 2,
        Omschrijving: "  ",
        MediaItems: [{ Url: "https://cloud.funda.nl/other.jpg", Width: 1200, Height: 800 }],
      },
    ]);

    expect(photos[0]?.description).toBe("Woonkamer met openslaande deuren");
    expect(photos[1]?.description).toBeUndefined();
  });

  it("keeps photos ordered by their source index", () => {
    const photos = mapPhotos(photoMedia([200, 1, 44]));

    expect(photos.map((photo) => photo.url)).toEqual([
      "https://cloud.funda.nl/1.jpg",
      "https://cloud.funda.nl/44.jpg",
      "https://cloud.funda.nl/200.jpg",
    ]);
  });
});

describe("normalizeListingUrl", () => {
  it("upgrades the Funda listing URL and rejects anything else", () => {
    expect(normalizeListingUrl("http://www.funda.nl/koop/huis-1/")).toBe(
      "https://www.funda.nl/koop/huis-1/",
    );
    expect(normalizeListingUrl("  https://www.funda.nl/koop/huis-1/  ")).toBe(
      "https://www.funda.nl/koop/huis-1/",
    );
    // Split so the literal never appears in the source as a usable scheme.
    const scriptUrl = ["java", "script:alert(1)"].join("");
    expect(normalizeListingUrl(scriptUrl)).toBeNull();
    expect(normalizeListingUrl("https://example.com/not-a-funda-listing")).toBeNull();
    expect(normalizeListingUrl("https://www.funda.nl@malicious.example/listing")).toBeNull();
    expect(normalizeListingUrl(null)).toBeNull();
  });
});

describe("mapFeatureGroups", () => {
  it("flattens the feature table and drops rows Funda leaves empty", () => {
    expect(
      mapFeatureGroups([
        {
          Titel: "Oppervlakten en inhoud",
          Kenmerken: [
            { Naam: "Wonen (= woonoppervlakte) ", Waarde: "151&nbsp;m&sup2;" },
            { Naam: "Inhoud", Waarde: null },
          ],
        },
        { Titel: "Overdracht", Kenmerken: [] },
        { Titel: null, Kenmerken: [{ Naam: "Status", Waarde: "Beschikbaar" }] },
      ]),
    ).toEqual([
      {
        title: "Oppervlakten en inhoud",
        features: [{ label: "Wonen (= woonoppervlakte)", value: "151 m²" }],
      },
    ]);
    expect(mapFeatureGroups(null)).toEqual([]);
  });
});

describe("mapListingDetail", () => {
  it("uses the requested id and maps the optional detail fields", () => {
    expect(
      mapListingDetail(
        {
          Adres: "Teststraat 1",
          Plaats: "Amsterdam",
          KoopPrijs: 500000,
          WGS84_X: 4.9,
          WGS84_Y: 52.37,
          Energielabel: { Label: "A" },
          Bouwjaar: 1890,
        },
        "listing-uuid",
      ),
    ).toMatchObject({
      id: "listing-uuid",
      price: 500000,
      energyLabel: "A",
      buildYear: "1890",
      coordinates: { longitude: 4.9, latitude: 52.37 },
    });
  });

  it("leaves the coordinates null when the feed omits one of them", () => {
    const result = mapListingDetail(
      { Adres: "Teststraat 1", Plaats: "Amsterdam", WGS84_X: 4.9 },
      "listing-uuid",
    );

    expect(result?.coordinates).toBeNull();
  });
});
