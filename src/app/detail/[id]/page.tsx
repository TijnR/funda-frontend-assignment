import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { Detail } from "@/components/features/detail/Detail/Detail";
import { DetailSkeleton } from "@/components/features/detail/DetailSkeleton/DetailSkeleton";
import { getListing } from "@/lib/funda/client";
import { PAGE_SHELL_CLASS } from "@/styles/shared";
import { cn } from "@/utils/cn";

type DetailPageProps = PageProps<"/detail/[id]">;
type ListingParams = Pick<DetailPageProps, "params">;

export async function generateMetadata({ params }: ListingParams): Promise<Metadata> {
  const { id } = await params;
  const listing = await getListing(id);
  if (!listing) return { title: "Woning niet gevonden" };

  return {
    title: listing.address,
    description: `${listing.address}, ${listing.postcode} ${listing.city}. Bekijk foto's, kenmerken en locatie.`,
  };
}

async function DetailContent({ params }: ListingParams) {
  const { id } = await params;
  const listing = await getListing(id);
  if (!listing) notFound();

  return <Detail listing={listing} />;
}

export default function DetailPage({ params }: DetailPageProps) {
  return (
    <main id="main-content" tabIndex={-1} className={cn(PAGE_SHELL_CLASS, "grow py-6 sm:py-8")}>
      <Suspense fallback={<DetailSkeleton />}>
        <DetailContent params={params} />
      </Suspense>
    </main>
  );
}
