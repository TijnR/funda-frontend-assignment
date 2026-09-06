import { HouseIcon } from "@phosphor-icons/react/dist/ssr/House";

import { StatusPanel } from "@/components/ui/StatusPanel/StatusPanel";

export function EmptyState() {
  return (
    <StatusPanel
      icon={HouseIcon}
      size="sm"
      title="Geen woningen gevonden"
      description="Deze resultatenpagina bevat op dit moment geen actief aanbod."
    />
  );
}
