"use client";

import { WarningIcon } from "@phosphor-icons/react/dist/ssr/Warning";

import { Button } from "@/components/ui/Button/Button";
import { StatusPanel } from "@/components/ui/StatusPanel/StatusPanel";

export function UpstreamErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <StatusPanel
      className="mx-auto max-w-xl"
      headingLevel={1}
      icon={WarningIcon}
      title="Het aanbod kon niet worden geladen"
      description="De verbinding met Funda haperde. Probeer het nog een keer."
      action={
        onRetry ? (
          <Button type="button" className="mt-6" onClick={onRetry}>
            Opnieuw proberen
          </Button>
        ) : null
      }
    />
  );
}
