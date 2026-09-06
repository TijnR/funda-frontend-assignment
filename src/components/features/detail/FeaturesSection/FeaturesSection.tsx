import { Expandable } from "@/components/ui/Expandable/Expandable";
import type { PropertyFeatureGroup } from "@/lib/funda/types";

import { PropertyFeatures } from "../PropertyFeatures/PropertyFeatures";

const COLLAPSE_FEATURE_ROWS = 14;

export function FeaturesSection({ groups }: { groups: PropertyFeatureGroup[] }) {
  const featureRows = groups.reduce((total, group) => total + group.features.length, 0);

  return (
    <section>
      <h2 className="font-heading text-2xl font-bold">Kenmerken</h2>
      <Expandable
        className="mt-5"
        summary={<PropertyFeatures groups={groups.slice(0, 1)} />}
        collapsible={featureRows > COLLAPSE_FEATURE_ROWS && groups.length > 1}
        expandLabel="Alle kenmerken tonen"
        collapseLabel="Minder kenmerken tonen"
      >
        <PropertyFeatures groups={groups} />
      </Expandable>
    </section>
  );
}
