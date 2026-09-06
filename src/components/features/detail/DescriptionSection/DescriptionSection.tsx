import { Expandable } from "@/components/ui/Expandable/Expandable";

import { PropertyDescription } from "../PropertyDescription/PropertyDescription";

const COLLAPSE_DESCRIPTION_CHARS = 900;

export function DescriptionSection({ description }: { description: string }) {
  return (
    <section>
      <h2 className="font-heading text-2xl font-bold">Beschrijving</h2>
      <Expandable
        className="mt-4"
        summary={<PropertyDescription description={description} preview />}
        collapsible={description.length > COLLAPSE_DESCRIPTION_CHARS}
      >
        <PropertyDescription description={description} />
      </Expandable>
    </section>
  );
}
