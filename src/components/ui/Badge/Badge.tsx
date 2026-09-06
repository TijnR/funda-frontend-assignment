import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/utils/cn";

export const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-sm px-3 py-1 text-xs font-semibold tracking-wide uppercase",
  {
    variants: {
      variant: {
        default: "bg-accent text-accent-foreground",
        /** Draws the eye to a listing we are deliberately promoting. */
        highlighted: "border border-white bg-secondary text-secondary-foreground shadow-card",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type BadgeProps = React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />;
}
