"use client";

import { CaretDownIcon } from "@phosphor-icons/react/dist/csr/CaretDown";
import { useId, useState, type ReactNode } from "react";

import { cn } from "@/utils/cn";

interface ExpandableProps {
  children: ReactNode;
  summary: ReactNode;
  collapsible?: boolean;
  expandLabel?: string;
  collapseLabel?: string;
  className?: string;
}

export function Expandable({
  children,
  summary,
  collapsible = true,
  expandLabel = "Lees meer",
  collapseLabel = "Lees minder",
  className,
}: ExpandableProps) {
  const contentId = useId();
  const [expanded, setExpanded] = useState(false);
  const collapsed = collapsible && !expanded;

  return (
    <div className={className}>
      {collapsed ? <div>{summary}</div> : null}
      <div id={contentId} hidden={collapsed}>
        {children}
      </div>
      {collapsible ? (
        <button
          type="button"
          aria-controls={contentId}
          aria-expanded={expanded}
          onClick={() => setExpanded((value) => !value)}
          className="mt-4 inline-flex min-h-6 items-center gap-1.5 rounded-card text-sm font-semibold text-link underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          {expanded ? collapseLabel : expandLabel}
          <CaretDownIcon
            className={cn(
              "size-4 transition-transform duration-200 motion-reduce:transition-none",
              expanded && "rotate-180",
            )}
            weight="bold"
            aria-hidden="true"
          />
        </button>
      ) : null}
    </div>
  );
}
