import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PropertyDescription } from "./PropertyDescription";

const description = [
  "Aan een van de mooiste grachten van de stad ligt deze lichte woning met een rustige achtertuin op het zuiden.",
  "De woonkamer heeft een originele visgraatvloer, hoge plafonds met ornamenten\nen openslaande deuren naar het terras.",
  "De buurt biedt volop winkels, scholen en openbaar vervoer binnen loopafstand.",
].join("\n\n");

const meta = {
  title: "Features/Detail/PropertyDescription",
  component: PropertyDescription,
  args: { description },
  parameters: { layout: "padded" },
} satisfies Meta<typeof PropertyDescription>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Preview: Story = {
  args: { preview: true },
};
