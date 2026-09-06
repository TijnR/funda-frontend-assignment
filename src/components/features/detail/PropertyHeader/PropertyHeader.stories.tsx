import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { listingDetailFixture } from "@/test/fixtures";

import { PropertyHeader } from "./PropertyHeader";

const meta = {
  title: "Features/Detail/PropertyHeader",
  component: PropertyHeader,
  args: {
    address: listingDetailFixture.address,
    city: listingDetailFixture.city,
    postcode: listingDetailFixture.postcode,
    price: listingDetailFixture.price,
  },
  parameters: { layout: "padded" },
} satisfies Meta<typeof PropertyHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const PriceOnRequest: Story = {
  args: { price: null },
};

export const LongAddress: Story = {
  args: { address: "Burgemeester Loeffplein 70 D", city: "'s-Hertogenbosch", postcode: "5211 RX" },
};
