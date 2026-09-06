import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, screen, userEvent, waitFor, within } from "storybook/test";

import { propertyPhotos } from "@/test/fixtures";

import { PropertyGallery } from "./PropertyGallery";

const photo = (index: number) => propertyPhotos[index % propertyPhotos.length];

const meta = {
  title: "Features/Gallery/PropertyGallery",
  component: PropertyGallery,
  args: { photos: propertyPhotos, label: "Keizersgracht 241 A" },
  parameters: { layout: "padded" },
} satisfies Meta<typeof PropertyGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

const findDialog = () => screen.findByRole("dialog");

export const Default: Story = {};

export const RestoresFocusOnClose: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "Bekijk alle 3 foto's" });

    await userEvent.click(trigger);

    const dialog = await findDialog();
    await expect(
      within(dialog).getByRole("heading", { name: "Keizersgracht 241 A" }),
    ).toBeInTheDocument();
    await expect(within(dialog).getByText("3 foto's")).toBeInTheDocument();

    await userEvent.keyboard("{Escape}");

    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    await waitFor(() => expect(trigger).toHaveFocus());
  },
};

export const BrowsesFromOverviewToLightbox: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button", { name: "Bekijk alle 3 foto's" }));

    const dialog = await findDialog();
    const lightbox = within(dialog);

    await userEvent.click(await lightbox.findByRole("button", { name: "Open foto 2" }));
    await expect(await lightbox.findByText("2 / 3")).toBeInTheDocument();

    await userEvent.keyboard("{ArrowRight}");
    await waitFor(() => expect(lightbox.getByText("3 / 3")).toBeInTheDocument());

    await userEvent.keyboard("{ArrowLeft}");
    await waitFor(() => expect(lightbox.getByText("2 / 3")).toBeInTheDocument());

    await userEvent.click(lightbox.getByRole("button", { name: "Alle foto's bekijken" }));
    await expect(
      await lightbox.findByRole("heading", { name: "Keizersgracht 241 A" }),
    ).toBeInTheDocument();
  },
};

export const SinglePhoto: Story = {
  args: { photos: propertyPhotos.slice(0, 1) },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "Open foto 1" });

    await userEvent.click(trigger);

    const dialog = await findDialog();
    const lightbox = within(dialog);

    await expect(await lightbox.findByText("1 / 1")).toBeInTheDocument();
    await expect(lightbox.queryByRole("button", { name: "Volgende foto" })).not.toBeInTheDocument();
    await expect(lightbox.queryByRole("button", { name: "Vorige foto" })).not.toBeInTheDocument();

    await userEvent.click(lightbox.getByRole("button", { name: "Galerij sluiten" }));

    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    await waitFor(() => expect(trigger).toHaveFocus());
  },
};

export const ManyPhotos: Story = {
  args: {
    photos: Array.from({ length: 9 }, (_, index) => ({
      ...photo(index),
      url: `${photo(index).url}&n=${index}`,
    })),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const triggers = canvas.getAllByRole("button", { name: "Bekijk alle 9 foto's" });
    await userEvent.click(triggers.at(-1)!);

    const dialog = await findDialog();
    await expect(within(dialog).getByText("9 foto's")).toBeInTheDocument();
    await expect(within(dialog).getAllByRole("button", { name: /^Open foto/ })).toHaveLength(9);
  },
};

export const WithoutPhotos: Story = {
  args: { photos: [] },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.queryByRole("button")).not.toBeInTheDocument();
    await expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  },
};
