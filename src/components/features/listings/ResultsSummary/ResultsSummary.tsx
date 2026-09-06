import type { ReactNode } from "react";

function SummaryLine({ children }: { children: ReactNode }) {
  return <p className="mb-4 text-sm text-muted-foreground">{children}</p>;
}

function SummaryNumber({ children }: { children: ReactNode }) {
  return <span className="font-semibold text-foreground tabular-nums">{children}</span>;
}

/** The counted range on the current page, shown above the grid. */
export function ResultsSummary({ from, to, total }: { from: number; to: number; total: number }) {
  if (total === 0 || to < from) {
    return <SummaryLine>Geen woningen op deze pagina</SummaryLine>;
  }

  return (
    <SummaryLine>
      <SummaryNumber>
        {from.toLocaleString("nl-NL")}&ndash;{to.toLocaleString("nl-NL")}
      </SummaryNumber>{" "}
      van <SummaryNumber>{total.toLocaleString("nl-NL")}</SummaryNumber> woningen
    </SummaryLine>
  );
}
