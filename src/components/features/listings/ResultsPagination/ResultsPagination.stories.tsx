import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";

import { ResultsPagination } from "./ResultsPagination";

const meta = {
  title: "Features/Listings/ResultsPagination",
  component: ResultsPagination,
  args: { page: 4, pageCount: 12 },
  parameters: { layout: "padded" },
} satisfies Meta<typeof ResultsPagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Middle: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByRole("link", { name: "Ga naar de vorige resultatenpagina" }),
    ).toHaveAttribute("href", "/?page=3");
    await expect(
      canvas.getByRole("link", { name: "Ga naar de volgende resultatenpagina" }),
    ).toHaveAttribute("href", "/?page=5");
    await expect(canvas.getByText("Pagina 4 van 12")).toHaveAttribute("aria-current", "page");
  },
};

export const SecondPage: Story = {
  args: { page: 2 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByRole("link", { name: "Ga naar de vorige resultatenpagina" }),
    ).toHaveAttribute("href", "/");
  },
};

export const FirstPage: Story = {
  args: { page: 1 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.queryByRole("link", { name: /vorige/i })).not.toBeInTheDocument();
    await expect(
      canvas.getByRole("link", { name: "Ga naar de volgende resultatenpagina" }),
    ).toHaveAttribute("href", "/?page=2");
  },
};

export const LastPage: Story = {
  args: { page: 12 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.queryByRole("link", { name: /volgende/i })).not.toBeInTheDocument();
    await expect(
      canvas.getByRole("link", { name: "Ga naar de vorige resultatenpagina" }),
    ).toHaveAttribute("href", "/?page=11");
  },
};

export const SinglePage: Story = {
  args: { page: 1, pageCount: 1 },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).queryByRole("navigation")).not.toBeInTheDocument();
  },
};
