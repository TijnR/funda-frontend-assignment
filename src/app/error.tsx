"use client";

import { useEffect } from "react";

import { UpstreamErrorState } from "@/components/features/listings/UpstreamErrorState/UpstreamErrorState";
import { PAGE_SHELL_CLASS } from "@/styles/shared";
import { cn } from "@/utils/cn";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main-content" tabIndex={-1} className={cn(PAGE_SHELL_CLASS, "grow py-16")}>
      <UpstreamErrorState onRetry={reset} />
    </main>
  );
}
