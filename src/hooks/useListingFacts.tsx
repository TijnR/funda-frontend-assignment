import { BedIcon } from "@phosphor-icons/react/dist/ssr/Bed";
import { BuildingsIcon } from "@phosphor-icons/react/dist/ssr/Buildings";
import { CalendarIcon } from "@phosphor-icons/react/dist/ssr/Calendar";
import { DoorOpenIcon } from "@phosphor-icons/react/dist/ssr/DoorOpen";
import { LightningIcon } from "@phosphor-icons/react/dist/ssr/Lightning";
import { RulerIcon } from "@phosphor-icons/react/dist/ssr/Ruler";
import { TreeIcon } from "@phosphor-icons/react/dist/ssr/Tree";

import { EnergyLabel } from "@/components/features/detail/EnergyLabel/EnergyLabel";
import type { Fact } from "@/components/ui/FactGrid/FactGrid";
import type { ListingDetail } from "@/lib/funda/types";
import { formatArea } from "@/utils/format";

export function useListingFacts(listing: ListingDetail): Fact[] {
  const facts: Fact[] = [];

  if (listing.livingArea !== null) {
    facts.push({
      label: "Woonoppervlak",
      value: formatArea(listing.livingArea),
      icon: RulerIcon,
    });
  }
  if (listing.plotArea !== null && listing.plotArea > 0) {
    facts.push({ label: "Perceel", value: formatArea(listing.plotArea), icon: TreeIcon });
  }
  if (listing.rooms !== null) {
    facts.push({ label: "Kamers", value: String(listing.rooms), icon: DoorOpenIcon });
  }
  if (listing.bedrooms !== null) {
    facts.push({ label: "Slaapkamers", value: String(listing.bedrooms), icon: BedIcon });
  }
  if (listing.buildYear) {
    facts.push({ label: "Bouwjaar", value: listing.buildYear, icon: CalendarIcon });
  }
  if (listing.brokerName) {
    facts.push({ label: "Makelaar", value: listing.brokerName, icon: BuildingsIcon });
  }
  if (listing.energyLabel) {
    facts.push({
      label: "Energielabel",
      emphasized: false,
      value: <EnergyLabel label={listing.energyLabel} />,
      icon: LightningIcon,
    });
  }

  return facts;
}
