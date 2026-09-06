import type { Meta, StoryObj } from "@storybook/nextjs-vite";

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

export const Default: Story = {};

export const SinglePhoto: Story = {
  args: { photos: propertyPhotos.slice(0, 1) },
};

export const ManyPhotos: Story = {
  args: {
    photos: Array.from({ length: 9 }, (_, index) => ({
      ...photo(index),
      url: `${photo(index).url}?n=${index}`,
    })),
  },
};

export const WithoutPhotos: Story = {
  args: { photos: [] },
};
