import { cacheLife, cacheTag } from "next/cache";
import { notFound } from "next/navigation";

import { EmptyState } from "@/components/features/listings/EmptyState/EmptyState";
import { ListingCard } from "@/components/features/listings/ListingCard/ListingCard";
import { ResultsPagination } from "@/components/features/listings/ResultsPagination/ResultsPagination";
import { ResultsSummary } from "@/components/features/listings/ResultsSummary/ResultsSummary";
import { getListings } from "@/lib/funda/client";
import { PAGE_SIZE } from "@/lib/funda/constants";
import { LISTING_GRID_CLASS } from "@/styles/shared";
import { cn } from "@/utils/cn";

import { getFeaturedListingIndices } from "./featuredListing";

export async function ListingResults({ requestedPage }: { requestedPage: number }) {
  "use cache";
  cacheLife("fundaListings");
  cacheTag(`listings:koop:${requestedPage}`);

  const listings = await getListings(requestedPage);

  if (requestedPage > listings.pageCount) notFound();

  const from = (listings.page - 1) * PAGE_SIZE + 1;
  const featuredIndices = getFeaturedListingIndices(listings.items.length);

  return (
    <section aria-label="Zoekresultaten">
      <ResultsSummary from={from} to={from + listings.items.length - 1} total={listings.total} />
      {listings.items.length > 0 ? (
        <ul aria-label="Woningen" className={LISTING_GRID_CLASS}>
          {listings.items.map((listing, index) => {
            const featured = featuredIndices.has(index);

            return (
              <li key={listing.id} className={cn(featured && "col-span-full my-6")}>
                <ListingCard listing={listing} preload={index === 0} featured={featured} />
              </li>
            );
          })}
        </ul>
      ) : (
        <EmptyState />
      )}
      <ResultsPagination page={listings.page} pageCount={listings.pageCount} />
    </section>
  );
}
