import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { listingFixture } from "@/test/fixtures";

import { ListingCard } from "./ListingCard";

const meta = {
  title: "Features/Listings/ListingCard",
  component: ListingCard,
  args: { listing: listingFixture },
  parameters: { layout: "padded" },
} satisfies Meta<typeof ListingCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [(Story) => <div className="max-w-md">{Story()}</div>],
};

/** Full-width variant: lays out horizontally once the card is wider than 44rem. */
export const Featured: Story = {
  args: { featured: true },
};

export const WithoutImage: Story = {
  args: { listing: { ...listingFixture, image: null } },
  decorators: [(Story) => <div className="max-w-md">{Story()}</div>],
};

/** The feed regularly omits price, area and room counts. */
export const MissingDetails: Story = {
  args: {
    listing: {
      ...listingFixture,
      price: null,
      livingArea: null,
      rooms: null,
      plotArea: null,
      postcode: "",
    },
  },
  decorators: [(Story) => <div className="max-w-md">{Story()}</div>],
};
