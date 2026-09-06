import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ListingsSkeleton } from "./ListingsSkeleton";

const meta = {
  title: "Features/Listings/ListingsSkeleton",
  component: ListingsSkeleton,
  parameters: { layout: "padded" },
} satisfies Meta<typeof ListingsSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
