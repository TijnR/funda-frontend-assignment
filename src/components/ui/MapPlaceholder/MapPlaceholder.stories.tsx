import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { MapPlaceholder } from "./MapPlaceholder";

const meta = {
  title: "UI/MapPlaceholder",
  component: MapPlaceholder,
  parameters: { layout: "padded" },
} satisfies Meta<typeof MapPlaceholder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
