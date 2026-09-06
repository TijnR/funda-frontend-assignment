import type { Icon } from "@phosphor-icons/react";
import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

export function StatusPanel({
  action,
  className,
  description,
  headingLevel = 2,
  icon: Icon,
  size = "md",
  title,
}: {
  action?: ReactNode;
  className?: string;
  description: ReactNode;
  /** Use 1 when the panel is the whole page, 2 when it sits inside one. */
  headingLevel?: 1 | 2;
  icon: Icon;
  size?: "sm" | "md";
  title: ReactNode;
}) {
  const Heading = headingLevel === 1 ? "h1" : "h2";

  return (
    <div className={cn("rounded-card border bg-card px-6 py-16 text-center", className)}>
      <Icon className="mx-auto size-10 text-primary" weight="duotone" aria-hidden="true" />
      <Heading
        className={cn("mt-4 font-heading font-bold", size === "sm" ? "text-xl" : "text-2xl")}
      >
        {title}
      </Heading>
      <p className={cn("mx-auto max-w-md text-muted-foreground", size === "sm" ? "mt-2" : "mt-3")}>
        {description}
      </p>
      {action}
    </div>
  );
}
