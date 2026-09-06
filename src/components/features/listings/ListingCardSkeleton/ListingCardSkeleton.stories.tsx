import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ListingCardSkeleton } from "./ListingCardSkeleton";

const meta = {
  title: "Features/Listings/ListingCardSkeleton",
  component: ListingCardSkeleton,
  parameters: { layout: "padded" },
} satisfies Meta<typeof ListingCardSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [(Story) => <div className="max-w-md">{Story()}</div>],
};

export const Featured: Story = {
  args: { featured: true },
};
