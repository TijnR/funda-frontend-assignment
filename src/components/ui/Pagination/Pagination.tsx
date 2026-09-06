import type * as React from "react";

import { cn } from "@/utils/cn";

export function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      aria-label="Resultaatpagina's"
      className={cn("flex justify-center", className)}
      {...props}
    />
  );
}

export function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
  return <ul className={cn("flex items-center gap-2", className)} {...props} />;
}

export function PaginationItem(props: React.ComponentProps<"li">) {
  return <li {...props} />;
}
