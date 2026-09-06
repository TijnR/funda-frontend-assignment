import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Breadcrumbs } from "./Breadcrumbs";

const meta = {
  title: "UI/Breadcrumbs",
  component: Breadcrumbs,
  args: {
    items: [
      { label: "Koopwoningen", href: "/" },
      { label: "Amsterdam" },
      { label: "Keizersgracht 241 A" },
    ],
  },
  parameters: { layout: "padded" },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Long addresses truncate instead of pushing the trail off the page. */
export const LongTrail: Story = {
  args: {
    items: [
      { label: "Koopwoningen", href: "/" },
      { label: "'s-Hertogenbosch" },
      { label: "Burgemeester Loeffplein 70 D, appartement met parkeerplaats" },
    ],
  },
  decorators: [(Story) => <div className="max-w-sm">{Story()}</div>],
};
