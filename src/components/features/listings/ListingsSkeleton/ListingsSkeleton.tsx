import { ListingCardSkeleton } from "@/components/features/listings/ListingCardSkeleton/ListingCardSkeleton";
import { getFeaturedListingIndices } from "@/components/features/listings/ListingResults/featuredListing";
import { Skeleton } from "@/components/ui/Skeleton/Skeleton";
import { PAGE_SIZE } from "@/lib/funda/constants";
import { LISTING_GRID_CLASS } from "@/styles/shared";
import { cn } from "@/utils/cn";

/** A full page is always the loading assumption, so the skeleton matches the real grid exactly. */
const FEATURED_INDICES = getFeaturedListingIndices(PAGE_SIZE);

export function ListingsSkeleton() {
  return (
    <section aria-busy="true" aria-label="Woningen laden">
      <Skeleton className="mb-4 h-5 w-44" />
      <ul className={LISTING_GRID_CLASS}>
        {Array.from({ length: PAGE_SIZE }, (_, index) => {
          const featured = FEATURED_INDICES.has(index);

          return (
            <li key={index} className={cn(featured && "col-span-full my-6")}>
              <ListingCardSkeleton featured={featured} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
