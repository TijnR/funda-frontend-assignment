import { Separator } from "@/components/ui/Separator/Separator";
import { Skeleton } from "@/components/ui/Skeleton/Skeleton";

export function DetailSkeleton() {
  return (
    <section aria-label="Woningdetails laden" aria-busy="true">
      <Skeleton className="mb-6 h-7 w-72 max-w-full" />
      <div className="space-y-10">
        <Skeleton className="aspect-4/3 w-full sm:aspect-auto sm:h-128" />

        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <Skeleton className="h-10 w-72 max-w-full" />
            <Skeleton className="h-7 w-44" />
          </div>
          <Skeleton className="h-9 w-40 sm:self-end" />
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-card border bg-border sm:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="space-y-2 bg-card p-4 sm:p-5">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-7 w-20" />
            </div>
          ))}
        </div>

        <div className="grid gap-10 lg:grid-cols-listing">
          <div className="space-y-10">
            <div>
              <Skeleton className="h-8 w-56" />
              <Skeleton className="mt-4 h-88 w-full" />
              <Skeleton className="mt-4 h-5 w-24" />
            </div>
            <div>
              <Skeleton className="h-8 w-40" />
              <Skeleton className="mt-5 h-120 w-full" />
              <Skeleton className="mt-4 h-5 w-44" />
            </div>
          </div>
          <Skeleton className="h-56 w-full" />
        </div>

        <div>
          <Separator />
          <div className="mt-10 mb-5 flex flex-wrap items-end justify-between gap-3">
            <div className="space-y-1">
              <Skeleton className="h-8 w-40" />
              <Skeleton className="h-6 w-56" />
            </div>
            <Skeleton className="h-9 w-48" />
          </div>
          <Skeleton className="h-80 w-full sm:h-112" />
        </div>
      </div>
    </section>
  );
}
