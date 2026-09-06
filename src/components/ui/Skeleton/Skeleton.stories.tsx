import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Skeleton } from "./Skeleton";

const meta = {
  title: "UI/Skeleton",
  component: Skeleton,
  args: { className: "h-6 w-64" },
  parameters: { layout: "centered" },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Block: Story = { args: { className: "h-40 w-80" } };
