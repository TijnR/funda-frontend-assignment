import { Breadcrumbs } from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { FactGrid } from "@/components/ui/FactGrid/FactGrid";
import type { ListingDetail } from "@/lib/funda/types";
import { cn } from "@/utils/cn";

import { PropertyGallery } from "../../gallery/PropertyGallery/PropertyGallery";
import { DescriptionSection } from "../DescriptionSection/DescriptionSection";
import { FeaturesSection } from "../FeaturesSection/FeaturesSection";
import { InterestCard } from "../InterestCard/InterestCard";
import { LocationSection } from "../LocationSection/LocationSection";
import { PropertyHeader } from "../PropertyHeader/PropertyHeader";
import { getListingFacts } from "./getListingFacts";

export function Detail({ listing }: { listing: ListingDetail }) {
  const facts = getListingFacts(listing);
  const hasDetails = !!listing.description || !!listing.featureGroups.length;

  return (
    <>
      <Breadcrumbs
        className="mb-6"
        items={[
          { label: "Koopwoningen", href: "/" },
          { label: listing.city },
          { label: listing.address },
        ]}
      />
      <article className="space-y-10">
        <PropertyGallery photos={listing.photos} label={listing.address} />
        <PropertyHeader
          address={listing.address}
          city={listing.city}
          postcode={listing.postcode}
          price={listing.price}
        />
        <FactGrid facts={facts} />
        <section className={cn("grid gap-10", hasDetails && "lg:grid-cols-listing")}>
          {hasDetails && (
            <div className="min-w-0 space-y-10">
              {!!listing.description && <DescriptionSection description={listing.description} />}
              {!!listing.featureGroups.length && <FeaturesSection groups={listing.featureGroups} />}
            </div>
          )}
          <InterestCard
            brokerName={listing.brokerName}
            fundaUrl={listing.fundaUrl}
            sticky={hasDetails}
          />
        </section>
        {!!listing.coordinates && (
          <LocationSection
            address={listing.address}
            city={listing.city}
            latitude={listing.coordinates.latitude}
            longitude={listing.coordinates.longitude}
          />
        )}
      </article>
    </>
  );
}
