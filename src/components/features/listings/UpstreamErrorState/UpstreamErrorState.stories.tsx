import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { UpstreamErrorState } from "./UpstreamErrorState";

const meta = {
  title: "Features/Listings/UpstreamErrorState",
  component: UpstreamErrorState,
  parameters: { layout: "padded" },
} satisfies Meta<typeof UpstreamErrorState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithRetry: Story = {
  args: { onRetry: () => {} },
};

export const WithoutRetry: Story = {};
