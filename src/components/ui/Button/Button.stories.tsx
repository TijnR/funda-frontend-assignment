import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "./Button";

const meta = {
  title: "UI/Button",
  component: Button,
  args: { children: "Bekijk woning" },
  parameters: { layout: "centered" },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Secondary: Story = { args: { variant: "secondary" } };
export const Outline: Story = { args: { variant: "outline" } };
export const Ghost: Story = { args: { variant: "ghost" } };
export const LinkStyle: Story = { args: { variant: "link" } };
export const Small: Story = { args: { size: "sm" } };
export const Disabled: Story = { args: { disabled: true } };
