import { toHttpsUrl } from "@/utils/url";

import type { RawListingsResponse, RawListingSummary } from "./schemas";
import type { ListingSummary, PaginatedListings, PropertyImage } from "./types";

/** The feed reports no dimensions for summary photos; these match what it serves. */
const FALLBACK_IMAGE_SIZE = { width: 922, height: 615 };

function toSummaryImage(raw: RawListingSummary): PropertyImage | null {
  const url = toHttpsUrl(raw.FotoLargest);
  if (!url) return null;

  return { url, ...FALLBACK_IMAGE_SIZE };
}

export function mapListingSummary(raw: RawListingSummary): ListingSummary | null {
  if (!raw.Id || !raw.Adres || !raw.Woonplaats) return null;

  return {
    id: raw.Id,
    address: raw.Adres,
    city: raw.Woonplaats,
    postcode: raw.Postcode ?? "",
    price: raw.Koopprijs ?? null,
    livingArea: raw.Woonoppervlakte ?? null,
    rooms: raw.AantalKamers ?? null,
    plotArea: raw.Perceeloppervlakte ?? null,
    image: toSummaryImage(raw),
  };
}

export function mapListingsResponse(raw: RawListingsResponse): PaginatedListings {
  return {
    items: (raw.Objects ?? [])
      .map(mapListingSummary)
      .filter((listing): listing is ListingSummary => listing !== null),
    page: raw.Paging?.HuidigePagina ?? 1,
    pageCount: raw.Paging?.AantalPaginas ?? 1,
    total: raw.TotaalAantalObjecten ?? 0,
  };
}
