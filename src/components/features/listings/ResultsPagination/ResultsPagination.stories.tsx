import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ResultsPagination } from "./ResultsPagination";

const meta = {
  title: "Features/Listings/ResultsPagination",
  component: ResultsPagination,
  args: { page: 4, pageCount: 12 },
  parameters: { layout: "padded" },
} satisfies Meta<typeof ResultsPagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Middle: Story = {};

export const FirstPage: Story = {
  args: { page: 1 },
};

export const LastPage: Story = {
  args: { page: 12 },
};

/** A single page needs no pager, so nothing renders. */
export const SinglePage: Story = {
  args: { page: 1, pageCount: 1 },
};
