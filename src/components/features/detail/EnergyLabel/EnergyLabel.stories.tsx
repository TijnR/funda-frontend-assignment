import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { EnergyLabel } from "./EnergyLabel";

const meta = {
  title: "Features/Detail/EnergyLabel",
  component: EnergyLabel,
  args: { label: "B" },
  parameters: { layout: "padded" },
} satisfies Meta<typeof EnergyLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllRatings: Story = {
  render: () => (
    <div className="flex max-w-40 flex-col gap-2">
      {["A++++", "A", "B", "C", "D", "E", "F", "G"].map((label) => (
        <EnergyLabel key={label} label={label} />
      ))}
    </div>
  ),
};

export const Unknown: Story = {
  args: { label: "Niet beschikbaar" },
};
