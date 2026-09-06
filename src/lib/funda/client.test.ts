import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { getListing, getListings } from "./client";
import { PAGE_SIZE } from "./constants";

vi.mock("server-only", () => ({}));
vi.mock("next/cache", () => ({
  cacheLife: vi.fn<(profile: string) => void>(),
  cacheTag: vi.fn<(...tags: string[]) => void>(),
}));

const validPayload = {
  Objects: [
    {
      Adres: "Keizersgracht 1",
      Id: "abc-123",
      Koopprijs: 475000,
      Woonplaats: "Amsterdam",
    },
  ],
  Paging: { AantalPaginas: 4, HuidigePagina: 1 },
  TotaalAantalObjecten: 52,
};

describe("getListings", () => {
  const fetchMock = vi.fn<typeof fetch>();

  beforeEach(() => {
    vi.stubEnv("FUNDA_API_KEY", "test-api-key");
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    fetchMock.mockReset();
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("returns mapped listings for a valid response", async () => {
    fetchMock.mockResolvedValue(Response.json(validPayload, { status: 200 }));

    await expect(getListings(1)).resolves.toMatchObject({ page: 1, pageCount: 4, total: 52 });
  });

  it("requests the koop feed for the given page", async () => {
    fetchMock.mockResolvedValue(Response.json(validPayload, { status: 200 }));
    await getListings(3);

    const [input] = fetchMock.mock.calls[0] ?? [];
    const url = typeof input === "string" ? input : "";
    expect(url).toContain("/feeds/Aanbod.svc/json/test-api-key/");
    expect(url).toContain("type=koop");
    expect(url).toContain("page=3");
    expect(url).toContain(`pagesize=${PAGE_SIZE}`);
  });

  it("fails loudly when the key is missing rather than calling Funda", async () => {
    vi.stubEnv("FUNDA_API_KEY", "");

    await expect(getListings(1)).rejects.toThrow("FUNDA_API_KEY is not configured.");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("reports malformed JSON", async () => {
    fetchMock.mockResolvedValue(new Response("{", { status: 200 }));

    await expect(getListings(1)).rejects.toThrow("Funda returned invalid JSON.");
  });

  it("reports a schema mismatch", async () => {
    fetchMock.mockResolvedValue(
      Response.json({ Objects: "not-an-array", Paging: null }, { status: 200 }),
    );

    await expect(getListings(1)).rejects.toThrow("Funda returned data in an unexpected shape.");
  });

  it("surfaces the feed's own validation report", async () => {
    fetchMock.mockResolvedValue(
      Response.json(
        { ValidationFailed: true, ValidationReport: "Ongeldige sleutel" },
        {
          status: 200,
        },
      ),
    );

    await expect(getListings(1)).rejects.toThrow("Ongeldige sleutel");
  });

  it("turns a network failure into a readable error", async () => {
    fetchMock.mockRejectedValue(new TypeError("network down"));

    await expect(getListings(1)).rejects.toThrow("Funda could not be reached.");
  });

  it("reports an error status from Funda", async () => {
    fetchMock.mockResolvedValue(new Response(null, { status: 503 }));

    await expect(getListings(1)).rejects.toThrow("Funda returned status 503.");
  });
});

describe("getListing", () => {
  const fetchMock = vi.fn<typeof fetch>();

  beforeEach(() => {
    vi.stubEnv("FUNDA_API_KEY", "test-api-key");
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    fetchMock.mockReset();
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("requests the koop detail feed for the given id", async () => {
    fetchMock.mockResolvedValue(
      Response.json({ Adres: "Keizersgracht 1", Plaats: "Amsterdam" }, { status: 200 }),
    );

    await expect(getListing("abc 123")).resolves.toMatchObject({
      id: "abc 123",
      address: "Keizersgracht 1",
      city: "Amsterdam",
    });

    const [input] = fetchMock.mock.calls[0] ?? [];
    expect(typeof input === "string" ? input : "").toContain(
      "/feeds/Aanbod.svc/json/detail/test-api-key/koop/abc%20123/",
    );
  });

  it("treats a 404 as a missing listing rather than an error", async () => {
    fetchMock.mockResolvedValue(new Response(null, { status: 404 }));

    await expect(getListing("gone")).resolves.toBeNull();
  });

  it("still reports a real upstream failure", async () => {
    fetchMock.mockResolvedValue(new Response(null, { status: 503 }));

    await expect(getListing("abc-123")).rejects.toThrow("Funda returned status 503.");
  });

  it("surfaces the feed's own validation report", async () => {
    fetchMock.mockResolvedValue(
      Response.json({ ValidationFailed: true, ValidationReport: "Ongeldige sleutel" }),
    );

    await expect(getListing("abc-123")).rejects.toThrow("Ongeldige sleutel");
  });
});
