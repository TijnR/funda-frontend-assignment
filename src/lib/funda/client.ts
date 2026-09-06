import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import type { z } from "zod";

import { PAGE_SIZE } from "./constants";
import { mapListingDetail, mapListingsResponse } from "./mappers";
import { rawListingDetailSchema, rawListingsResponseSchema } from "./schemas";
import type { ListingDetail, PaginatedListings } from "./types";

// Maybe a little overkill, but preferable when working with test, acceptance and
// production environments.
const API_ORIGIN = process.env.FUNDA_API_ORIGIN ?? "https://partnerapi.funda.nl";
const REQUEST_TIMEOUT_MS = 10_000;

function getApiKey(): string {
  const apiKey = process.env.FUNDA_API_KEY;
  if (!apiKey) throw new Error("FUNDA_API_KEY is not configured.");

  return apiKey;
}

async function requestFunda<TSchema extends z.ZodTypeAny>(
  path: string,
  schema: TSchema,
): Promise<z.output<TSchema> | null> {
  let response: Response;
  try {
    response = await fetch(`${API_ORIGIN}${path}`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch (cause) {
    throw new Error("Funda could not be reached.", { cause });
  }

  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`Funda returned status ${response.status}.`);
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch (cause) {
    throw new Error("Funda returned invalid JSON.", { cause });
  }

  const result = schema.safeParse(payload);
  if (!result.success) {
    throw new Error("Funda returned data in an unexpected shape.", { cause: result.error });
  }

  return result.data;
}

export async function getListings(page: number): Promise<PaginatedListings> {
  "use cache";
  cacheLife("fundaListings");
  cacheTag(`listings:koop:${page}`);

  const apiKey = getApiKey();
  const query = new URLSearchParams({
    type: "koop",
    page: String(page),
    pagesize: String(PAGE_SIZE),
  });
  const raw = await requestFunda(
    `/feeds/Aanbod.svc/json/${encodeURIComponent(apiKey)}/?${query.toString()}`,
    rawListingsResponseSchema,
  );

  if (!raw) throw new Error("Funda returned status 404.");
  if (raw.ValidationFailed === true) {
    throw new Error(raw.ValidationReport || "Funda rejected the listings request.");
  }

  return mapListingsResponse(raw);
}

export async function getListing(id: string): Promise<ListingDetail | null> {
  "use cache";
  cacheTag(`listing:${id}`);

  const apiKey = getApiKey();
  const raw = await requestFunda(
    `/feeds/Aanbod.svc/json/detail/${encodeURIComponent(apiKey)}/koop/${encodeURIComponent(id)}/`,
    rawListingDetailSchema,
  );

  // A missing listing is cached far more briefly than a real one.
  if (!raw) {
    cacheLife("fundaMissing");
    return null;
  }
  if (raw.ValidationFailed === true) {
    throw new Error(raw.ValidationReport || "Funda rejected the listing request.");
  }

  const listing = mapListingDetail(raw, id);
  if (!listing) {
    cacheLife("fundaMissing");
    return null;
  }

  cacheLife("fundaDetail");
  return listing;
}
