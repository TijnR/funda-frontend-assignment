import type { Icon } from "@phosphor-icons/react";

import { cn } from "@/utils/cn";

export function ImagePlaceholder({ className, icon: Icon }: { className?: string; icon: Icon }) {
  return (
    <div
      className={cn(
        "grid size-full place-items-center bg-linear-to-br from-chrome to-muted text-muted-foreground",
        className,
      )}
      aria-hidden="true"
    >
      <Icon className="size-12" weight="duotone" aria-hidden="true" />
    </div>
  );
}
