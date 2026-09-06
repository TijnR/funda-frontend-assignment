import { EnergyLabel } from "@/components/features/detail/EnergyLabel/EnergyLabel";
import type { PropertyFeatureGroup } from "@/lib/funda/types";

const ENERGY_LABEL_ROW = "energielabel";

function FeatureValue({ label, value }: { label: string; value: string }) {
  if (label.toLowerCase() === ENERGY_LABEL_ROW) {
    return (
      <span className="flex justify-end">
        <span className="w-24">
          <EnergyLabel label={value} />
        </span>
      </span>
    );
  }

  return value;
}

export function PropertyFeatures({ groups }: { groups: PropertyFeatureGroup[] }) {
  if (groups.length === 0) return null;

  return (
    <div className="space-y-8">
      {groups.map((group) => (
        <section key={group.title}>
          <h3 className="font-heading text-lg font-bold">{group.title}</h3>
          <dl className="mt-3 border-t border-border">
            {group.features.map((feature) => (
              <div
                key={feature.label}
                className="grid grid-cols-2 items-baseline gap-4 border-b border-border py-2.5 text-sm sm:gap-8"
              >
                <dt className="text-muted-foreground">{feature.label}</dt>
                <dd className="text-right font-medium text-foreground">
                  <FeatureValue label={feature.label} value={feature.value} />
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
}
