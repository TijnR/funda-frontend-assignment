import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { DetailSkeleton } from "./DetailSkeleton";

const meta = {
  title: "Features/Detail/DetailSkeleton",
  component: DetailSkeleton,
  parameters: { layout: "padded" },
} satisfies Meta<typeof DetailSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
