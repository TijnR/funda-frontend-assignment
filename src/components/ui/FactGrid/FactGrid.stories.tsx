import { BedIcon } from "@phosphor-icons/react/dist/ssr/Bed";
import { CalendarIcon } from "@phosphor-icons/react/dist/ssr/Calendar";
import { DoorOpenIcon } from "@phosphor-icons/react/dist/ssr/DoorOpen";
import { LightningIcon } from "@phosphor-icons/react/dist/ssr/Lightning";
import { RulerIcon } from "@phosphor-icons/react/dist/ssr/Ruler";
import { TreeIcon } from "@phosphor-icons/react/dist/ssr/Tree";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { EnergyLabel } from "@/components/features/detail/EnergyLabel/EnergyLabel";

import { FactGrid } from "./FactGrid";

const meta = {
  title: "UI/FactGrid",
  component: FactGrid,
  args: {
    facts: [
      { label: "Woonoppervlak", value: "128 m²", icon: RulerIcon },
      { label: "Perceel", value: "156 m²", icon: TreeIcon },
      { label: "Kamers", value: "4", icon: DoorOpenIcon },
      { label: "Slaapkamers", value: "3", icon: BedIcon },
      { label: "Bouwjaar", value: "1890", icon: CalendarIcon },
      {
        label: "Energielabel",
        emphasized: false,
        value: <EnergyLabel label="B" />,
        icon: LightningIcon,
      },
    ],
  },
  parameters: { layout: "padded" },
} satisfies Meta<typeof FactGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** The feed regularly reports only a couple of the facts. */
export const Sparse: Story = {
  args: { facts: [{ label: "Woonoppervlak", value: "72 m²", icon: RulerIcon }] },
};
