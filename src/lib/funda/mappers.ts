import { toHttpsUrl } from "@/utils/url";

import { toPlainText } from "./html";
import type {
  RawFundaFeatureGroup,
  RawFundaImage,
  RawFundaMedia,
  RawListingDetail,
  RawListingsResponse,
  RawListingSummary,
} from "./schemas";
import type {
  ListingDetail,
  ListingSummary,
  PaginatedListings,
  PropertyFeatureGroup,
  PropertyImage,
} from "./types";

// The feed reports no dimensions for summary photos; these match what it serves.
const FALLBACK_IMAGE_SIZE = { width: 922, height: 615 };

// Only absolute https funda links are followed; anything else could be a `javascript:` URL.
export function normalizeListingUrl(url: string | null | undefined): string | null {
  const upgraded = toHttpsUrl(url?.trim() || null);
  if (!upgraded) return null;

  try {
    const parsed = new URL(upgraded);
    const isFundaHost = parsed.hostname === "funda.nl" || parsed.hostname.endsWith(".funda.nl");

    return parsed.protocol === "https:" && isFundaHost && parsed.port === ""
      ? parsed.toString()
      : null;
  } catch {
    return null;
  }
}

/**
 * Funda groups its feature table (`Kenmerken`) by section. Rows without a label
 * or value are layout artefacts of its own front end, so they are dropped.
 */
export function mapFeatureGroups(
  groups: RawFundaFeatureGroup[] | null | undefined,
): PropertyFeatureGroup[] {
  return (groups ?? [])
    .map((group) => ({
      title: toPlainText(group.Titel),
      features: (group.Kenmerken ?? [])
        .map((feature) => ({
          label: toPlainText(feature.Naam),
          value: toPlainText(feature.Waarde),
        }))
        .filter((feature) => feature.label !== "" && feature.value !== ""),
    }))
    .filter((group) => group.title !== "" && group.features.length > 0);
}

function toPropertyImage(image: RawFundaImage | undefined): PropertyImage | null {
  const url = toHttpsUrl(image?.UrlSecure ?? image?.Url);
  if (!url) return null;

  return {
    url,
    width: image?.Width && image.Width > 0 ? image.Width : FALLBACK_IMAGE_SIZE.width,
    height: image?.Height && image.Height > 0 ? image.Height : FALLBACK_IMAGE_SIZE.height,
  };
}

function toSummaryImage(raw: RawListingSummary): PropertyImage | null {
  const url = toHttpsUrl(raw.FotoLargest);
  if (!url) return null;

  return { url, ...FALLBACK_IMAGE_SIZE };
}

function selectLargestImage(media: RawFundaMedia): PropertyImage | null {
  const largest = [...(media.MediaItems ?? [])]
    .filter((image) => toHttpsUrl(image.UrlSecure ?? image.Url))
    .sort(
      (left, right) =>
        (right.Width ?? 0) * (right.Height ?? 0) - (left.Width ?? 0) * (left.Height ?? 0),
    )[0];

  const image = toPropertyImage(largest);
  const description = media.Omschrijving?.trim();
  return image && description ? { ...image, description } : image;
}

export function mapPhotos(media: RawFundaMedia[] | null | undefined): PropertyImage[] {
  const photoMedia = (media ?? [])
    .filter((item) => item.Categorie === 1 && item.ContentType === 1)
    .sort((left, right) => (left.IndexNumber ?? 0) - (right.IndexNumber ?? 0));

  return photoMedia
    .map(selectLargestImage)
    .filter((image): image is PropertyImage => image !== null);
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

export function mapListingDetail(raw: RawListingDetail, requestedId: string): ListingDetail | null {
  if (!raw.Adres || !raw.Plaats) return null;

  const photos = mapPhotos(raw.Media);
  const coordinates =
    typeof raw.WGS84_X === "number" && typeof raw.WGS84_Y === "number"
      ? { longitude: raw.WGS84_X, latitude: raw.WGS84_Y }
      : null;

  return {
    id: requestedId,
    address: raw.Adres,
    city: raw.Plaats,
    postcode: raw.Postcode ?? "",
    price: raw.KoopPrijs ?? raw.Koopprijs ?? null,
    livingArea: raw.WoonOppervlakte ?? null,
    rooms: raw.AantalKamers ?? null,
    plotArea: raw.PerceelOppervlakte ?? null,
    image: photos[0] ?? null,
    description: raw.VolledigeOmschrijving?.trim() || null,
    buildYear: raw.Bouwjaar == null ? null : String(raw.Bouwjaar),
    bedrooms: raw.AantalSlaapkamers ?? null,
    energyLabel: raw.Energielabel?.Label ?? null,
    brokerName: raw.Makelaar ?? null,
    fundaUrl: normalizeListingUrl(raw.URL),
    featureGroups: mapFeatureGroups(raw.Kenmerken),
    coordinates,
    photos,
  };
}
