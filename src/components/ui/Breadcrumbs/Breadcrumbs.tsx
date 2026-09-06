import { CaretRightIcon } from "@phosphor-icons/react/dist/ssr/CaretRight";
import Link from "next/link";

import { cn } from "@/utils/cn";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Kruimelpad" className={className}>
      <ol className="-mx-2 flex flex-wrap items-center gap-y-1 text-sm">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex min-w-0 items-center">
              {index > 0 ? (
                <CaretRightIcon
                  className="mx-0.5 size-3.5 shrink-0 text-muted-foreground/50"
                  weight="bold"
                  aria-hidden="true"
                />
              ) : null}
              {item.href && !isCurrent ? (
                <Link
                  href={item.href}
                  className="rounded-card px-2 py-1 font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isCurrent ? "page" : undefined}
                  className={cn(
                    "truncate px-2 py-1",
                    isCurrent ? "font-semibold text-foreground" : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
