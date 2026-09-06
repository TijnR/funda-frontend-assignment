import type * as React from "react";

import { cn } from "@/utils/cn";

export function Separator({ className, ...props }: React.ComponentProps<"hr">) {
  return <hr className={cn("border-0 border-t border-border", className)} {...props} />;
}
