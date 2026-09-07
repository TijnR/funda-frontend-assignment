import type { Metadata } from "next";
import { Suspense } from "react";

import { ListingResults } from "@/components/features/listings/ListingResults/ListingResults";
import { ListingsSkeleton } from "@/components/features/listings/ListingsSkeleton/ListingsSkeleton";
import { PAGE_SHELL_CLASS } from "@/styles/shared";
import { cn } from "@/utils/cn";
import { parsePage } from "@/utils/format";

export const metadata: Metadata = {
  title: "Koopwoningen",
};

async function ResolvedListingResults({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  return <ListingResults requestedPage={parsePage(params.page)} />;
}

/**
 * Stays synchronous so the shell prerenders: the header, the page title and the
 * footer paint immediately while the listings stream into the boundary below.
 */
export default function HomePage({ searchParams }: PageProps<"/">) {
  return (
    <main id="main-content" tabIndex={-1} className={cn(PAGE_SHELL_CLASS, "grow py-10")}>
      <header className="mb-6 border-b pb-6 sm:mb-8">
        <p className="font-heading text-xs font-bold tracking-widest text-primary uppercase">
          Actueel aanbod
        </p>
        <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          Koopwoningen in Nederland
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Blader door het volledige koopaanbod van Funda, dagelijks bijgewerkt.
        </p>
      </header>
      <Suspense fallback={<ListingsSkeleton />}>
        <ResolvedListingResults searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
