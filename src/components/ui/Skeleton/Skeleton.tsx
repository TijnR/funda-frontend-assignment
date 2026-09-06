import type * as React from "react";

import { cn } from "@/utils/cn";

export function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("animate-pulse rounded-card bg-muted motion-reduce:animate-none", className)}
      {...props}
    />
  );
}
