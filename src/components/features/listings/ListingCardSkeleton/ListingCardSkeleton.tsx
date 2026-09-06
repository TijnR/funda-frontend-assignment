import { Skeleton } from "@/components/ui/Skeleton/Skeleton";
import { cn } from "@/utils/cn";

export function ListingCardSkeleton({ featured = false }: { featured?: boolean }) {
  return (
    <div className="@container/listing-card h-full">
      <div
        className={cn(
          "flex h-full flex-col overflow-hidden rounded-card border border-border bg-card shadow-card",
          featured && "@featured/listing-card:min-h-80 @featured/listing-card:flex-row",
        )}
      >
        <Skeleton
          className={cn(
            "aspect-8/5 w-full rounded-none",
            featured &&
              "@featured/listing-card:aspect-auto @featured/listing-card:w-[calc(50%-0.5rem)] @featured/listing-card:shrink-0",
          )}
        />
        <div
          className={cn(
            "flex flex-1 flex-col gap-4 p-5",
            featured &&
              "@featured/listing-card:justify-center @featured/listing-card:gap-6 @featured/listing-card:p-10",
          )}
        >
          <div className="flex flex-col gap-2">
            <Skeleton className={cn("h-7 w-2/3", featured && "@featured/listing-card:h-9")} />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <Skeleton className={cn("h-7 w-1/3", featured && "@featured/listing-card:h-8")} />
          <Skeleton className="h-5 w-4/5" />
        </div>
      </div>
    </div>
  );
}
