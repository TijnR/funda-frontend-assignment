import "server-only";
import { cacheLife, cacheTag } from "next/cache";

import { PAGE_SIZE } from "./constants";
import { mapListingsResponse } from "./mappers";
import { rawListingsResponseSchema } from "./schemas";
import type { PaginatedListings } from "./types";

// Maybe a little overkill, but preferable when working with test, acceptance and
// production environments.
const API_ORIGIN = process.env.FUNDA_API_ORIGIN ?? "https://partnerapi.funda.nl";
const REQUEST_TIMEOUT_MS = 10_000;

export async function getListings(page: number): Promise<PaginatedListings> {
  "use cache";
  cacheLife("fundaListings");
  cacheTag(`listings:koop:${page}`);

  const apiKey = process.env.FUNDA_API_KEY;
  if (!apiKey) throw new Error("FUNDA_API_KEY is not configured.");

  const query = new URLSearchParams({
    type: "koop",
    page: String(page),
    pagesize: String(PAGE_SIZE),
  });

  let response: Response;
  try {
    response = await fetch(
      `${API_ORIGIN}/feeds/Aanbod.svc/json/${encodeURIComponent(apiKey)}/?${query.toString()}`,
      {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      },
    );
  } catch (cause) {
    throw new Error("Funda could not be reached.", { cause });
  }

  if (!response.ok) {
    throw new Error(`Funda returned status ${response.status}.`);
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch (cause) {
    throw new Error("Funda returned invalid JSON.", { cause });
  }

  const result = rawListingsResponseSchema.safeParse(payload);
  if (!result.success) {
    throw new Error("Funda returned data in an unexpected shape.", { cause: result.error });
  }
  if (result.data.ValidationFailed === true) {
    throw new Error(result.data.ValidationReport || "Funda rejected the listings request.");
  }

  return mapListingsResponse(result.data);
}
