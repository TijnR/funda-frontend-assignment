import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ResultsSummary } from "./ResultsSummary";

const meta = {
  title: "Features/Listings/ResultsSummary",
  component: ResultsSummary,
  args: { from: 1, to: 15, total: 52341 },
  parameters: { layout: "padded" },
} satisfies Meta<typeof ResultsSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LastPage: Story = {
  args: { from: 52336, to: 52341 },
};

export const NoResults: Story = {
  args: { from: 1, to: 0, total: 0 },
};
