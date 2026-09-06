import { HouseIcon } from "@phosphor-icons/react/dist/ssr/House";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ImagePlaceholder } from "./ImagePlaceholder";

const meta = {
  title: "UI/ImagePlaceholder",
  component: ImagePlaceholder,
  args: { icon: HouseIcon, className: "aspect-8/5 w-96" },
  parameters: { layout: "centered" },
} satisfies Meta<typeof ImagePlaceholder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
