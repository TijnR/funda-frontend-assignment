import { BedIcon } from "@phosphor-icons/react/dist/ssr/Bed";
import { HouseIcon } from "@phosphor-icons/react/dist/ssr/House";
import { RulerIcon } from "@phosphor-icons/react/dist/ssr/Ruler";
import { SparkleIcon } from "@phosphor-icons/react/dist/ssr/Sparkle";
import { TreeIcon } from "@phosphor-icons/react/dist/ssr/Tree";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/Badge/Badge";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder/ImagePlaceholder";
import type { ListingSummary } from "@/lib/funda/types";
import { cn } from "@/utils/cn";
import { formatArea, formatPrice } from "@/utils/format";

/** Wording for a listing we are deliberately putting in the spotlight. */
const FEATURED_LABEL = "Blikvanger";

export function ListingCard({
  listing,
  preload = false,
  featured = false,
}: {
  listing: ListingSummary;
  preload?: boolean;
  /** Spans the full grid width and, when the card itself is wide enough, lays out horizontally. */
  featured?: boolean;
}) {
  return (
    <Link
      href={`/detail/${listing.id}`}
      className="group @container/listing-card block h-full rounded-card focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:outline-none"
      aria-label={`${featured ? `${FEATURED_LABEL}: ` : ""}${listing.address}, ${listing.city}, ${formatPrice(listing.price)}`}
    >
      <article
        className={cn(
          "flex h-full flex-col overflow-hidden rounded-card border border-border bg-card text-card-foreground shadow-card",
          featured && "@featured/listing-card:min-h-80 @featured/listing-card:flex-row",
        )}
      >
        {/* Half the grid gap is shaved off so the image ends exactly where the first grid column does. */}
        <div
          className={cn(
            "relative aspect-8/5 overflow-hidden bg-muted",
            featured &&
              "@featured/listing-card:aspect-auto @featured/listing-card:w-[calc(50%-0.5rem)] @featured/listing-card:shrink-0",
          )}
        >
          {listing.image ? (
            <Image
              src={listing.image.url}
              alt={listing.image.description ?? `Woning aan ${listing.address}`}
              fill
              sizes="(max-width: 767px) 100vw, (max-width: 1200px) 50vw, 560px"
              preload={preload}
              fetchPriority={preload ? "high" : "low"}
              className="object-cover group-hover:scale-102"
            />
          ) : (
            <ImagePlaceholder icon={HouseIcon} />
          )}
          {featured ? (
            <Badge variant="highlighted" className="absolute top-4 left-4">
              <SparkleIcon className="size-3.5" weight="fill" aria-hidden="true" />
              {FEATURED_LABEL}
            </Badge>
          ) : null}
        </div>
        <div
          className={cn(
            "flex flex-1 flex-col gap-4 p-5",
            featured &&
              "@featured/listing-card:justify-center @featured/listing-card:gap-6 @featured/listing-card:p-10",
          )}
        >
          <div>
            <h2
              className={cn(
                "font-heading text-xl font-bold tracking-tight transition-colors duration-200 group-hover:text-secondary",
                featured && "@featured/listing-card:text-3xl",
              )}
            >
              {listing.address}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {[listing.postcode, listing.city].filter(Boolean).join(" ")}
            </p>
          </div>
          <p
            className={cn(
              "text-lg font-bold text-foreground",
              featured && "@featured/listing-card:text-2xl",
            )}
          >
            {formatPrice(listing.price)}
          </p>
          <ul
            className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground"
            aria-label="Woningkenmerken"
          >
            {listing.livingArea != null ? (
              <li className="inline-flex items-center gap-1.5">
                <RulerIcon className="size-4" weight="duotone" aria-hidden="true" />
                {formatArea(listing.livingArea)} wonen
              </li>
            ) : null}
            {listing.rooms != null ? (
              <li className="inline-flex items-center gap-1.5">
                <BedIcon className="size-4" weight="duotone" aria-hidden="true" />
                {listing.rooms} kamers
              </li>
            ) : null}
            {listing.plotArea != null && listing.plotArea > 0 ? (
              <li className="inline-flex items-center gap-1.5">
                <TreeIcon className="size-4" weight="duotone" aria-hidden="true" />
                {formatArea(listing.plotArea)} perceel
              </li>
            ) : null}
          </ul>
        </div>
      </article>
    </Link>
  );
}
