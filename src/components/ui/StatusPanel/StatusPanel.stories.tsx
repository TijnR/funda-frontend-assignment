import { HouseIcon } from "@phosphor-icons/react/dist/ssr/House";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { StatusPanel } from "./StatusPanel";

const meta = {
  title: "UI/StatusPanel",
  component: StatusPanel,
  args: {
    icon: HouseIcon,
    title: "Geen woningen gevonden",
    description: "Deze resultatenpagina bevat op dit moment geen actief aanbod.",
  },
  parameters: { layout: "padded" },
} satisfies Meta<typeof StatusPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Small: Story = { args: { size: "sm" } };
