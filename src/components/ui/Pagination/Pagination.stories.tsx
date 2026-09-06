import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Pagination, PaginationContent, PaginationItem } from "./Pagination";

const meta = {
  title: "UI/Pagination",
  component: Pagination,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <PaginationContent>
        <PaginationItem>Vorige</PaginationItem>
        <PaginationItem>Pagina 4 van 12</PaginationItem>
        <PaginationItem>Volgende</PaginationItem>
      </PaginationContent>
    ),
  },
};
