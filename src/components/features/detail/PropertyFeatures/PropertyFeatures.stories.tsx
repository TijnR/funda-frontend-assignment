import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { propertyFeatureGroups } from "@/test/fixtures";

import { PropertyFeatures } from "./PropertyFeatures";

const meta = {
  title: "Features/Detail/PropertyFeatures",
  component: PropertyFeatures,
  args: { groups: propertyFeatureGroups },
  parameters: { layout: "padded" },
} satisfies Meta<typeof PropertyFeatures>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleGroup: Story = {
  args: { groups: propertyFeatureGroups.slice(0, 1) },
};
