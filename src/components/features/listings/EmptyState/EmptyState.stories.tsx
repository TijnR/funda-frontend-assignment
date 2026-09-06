import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { EmptyState } from "./EmptyState";

const meta = {
  title: "Features/Listings/EmptyState",
  component: EmptyState,
  parameters: { layout: "padded" },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
