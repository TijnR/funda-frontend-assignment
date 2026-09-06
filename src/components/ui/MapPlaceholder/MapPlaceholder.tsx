import { Skeleton } from "@/components/ui/Skeleton/Skeleton";

export function MapPlaceholder() {
  return (
    <section aria-label="Kaart laden" aria-busy="true">
      <Skeleton className="h-80 w-full sm:h-112" />
    </section>
  );
}
