import type { Icon } from "@phosphor-icons/react";
import type { ReactNode } from "react";

export interface Fact {
  // Renders the value in the heading font. Turn off for values that carry their own styling. (Like energy labels.)
  emphasized?: boolean;
  label: string;
  value: ReactNode;
  icon: Icon;
}

export function FactGrid({ facts }: { facts: Fact[] }) {
  if (facts.length === 0) return null;

  return (
    <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-card border bg-border sm:grid-cols-3">
      {facts.map(({ emphasized = true, icon: Icon, label, value }) => (
        <div key={label} className="bg-card p-4 sm:p-5">
          <dt className="flex items-center gap-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            <Icon className="size-4 text-muted-foreground" weight="duotone" aria-hidden="true" />
            {label}
          </dt>
          <dd className={emphasized ? "mt-2 font-heading text-lg font-bold" : "mt-2"}>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
