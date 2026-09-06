import { SparkleIcon } from "@phosphor-icons/react/dist/ssr/Sparkle";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Badge } from "./Badge";

const meta = {
  title: "UI/Badge",
  component: Badge,
  args: { children: "Nieuw" },
  parameters: { layout: "centered" },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Highlighted: Story = {
  args: {
    variant: "highlighted",
    children: (
      <>
        <SparkleIcon className="size-3.5" weight="fill" aria-hidden="true" />
        Blikvanger
      </>
    ),
  },
};
