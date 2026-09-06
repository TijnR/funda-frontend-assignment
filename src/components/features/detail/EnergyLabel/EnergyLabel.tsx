import { cn } from "@/utils/cn";

/** Funda's own energy label palette; these do not map onto the site's tokens. */
const ENERGY_LABEL_COLORS = {
  A: "#00843d",
  "A+": "#00843d",
  "A++": "#00843d",
  "A+++": "#00843d",
  "A++++": "#00843d",
  B: "#229c3f",
  C: "#8fbe18",
  D: "#ffe500",
  E: "#f8ae27",
  F: "#ef5b0c",
  G: "#c91429",
} as const;

/** The labels light enough that white text on them would fail contrast. */
const DARK_TEXT_LABELS = ["C", "D", "E"];

const ARROW_SHAPE = "polygon(0 0, calc(100% - 16px) 0, 100% 50%, calc(100% - 16px) 100%, 0 100%)";

function isEnergyLabel(label: string): label is keyof typeof ENERGY_LABEL_COLORS {
  return label in ENERGY_LABEL_COLORS;
}

export function EnergyLabel({ label }: { label: string }) {
  const normalizedLabel = label.trim().toUpperCase();
  const color = isEnergyLabel(normalizedLabel) ? ENERGY_LABEL_COLORS[normalizedLabel] : null;

  return (
    <figure className="w-full max-w-40">
      <div
        className={cn(
          "flex h-8 w-full items-center px-2.5 text-xl leading-none font-bold",
          color === null && "bg-muted-foreground",
          color !== null && DARK_TEXT_LABELS.includes(normalizedLabel)
            ? "text-foreground"
            : "text-white",
        )}
        style={{ backgroundColor: color ?? undefined, clipPath: ARROW_SHAPE }}
        aria-hidden="true"
      >
        {normalizedLabel}
      </div>
      <figcaption className="sr-only">De woning heeft energielabel {normalizedLabel}.</figcaption>
    </figure>
  );
}
