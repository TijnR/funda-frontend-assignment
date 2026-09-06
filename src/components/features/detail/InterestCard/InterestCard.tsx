import { ArrowSquareOutIcon } from "@phosphor-icons/react/dist/ssr/ArrowSquareOut";

import { buttonVariants } from "@/components/ui/Button/Button";
import { cn } from "@/utils/cn";

export function InterestCard({
  brokerName,
  fundaUrl,
  sticky,
}: {
  brokerName: string | null;
  fundaUrl: string | null;
  sticky: boolean;
}) {
  return (
    <aside
      className={cn(
        "h-fit rounded-card border bg-card p-5 shadow-card",
        sticky && "lg:sticky lg:top-6",
        !sticky && "max-w-md",
      )}
    >
      <h2 className="font-heading text-lg font-bold">Interesse?</h2>
      <p className="mt-2 text-sm/6 text-muted-foreground">
        Neem contact op met {brokerName?.trim() || "de verkopende makelaar"} via de originele
        advertentie op Funda.
      </p>
      {!!fundaUrl && (
        <a
          href={fundaUrl}
          target="_blank"
          rel="noreferrer"
          className={cn(buttonVariants(), "mt-4 w-full")}
        >
          Bekijk op Funda
          <ArrowSquareOutIcon className="size-4" weight="bold" aria-hidden="true" />
          <span className="sr-only">(opent in een nieuw tabblad)</span>
        </a>
      )}
    </aside>
  );
}
