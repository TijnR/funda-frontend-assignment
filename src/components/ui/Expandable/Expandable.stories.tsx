import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";

import { Expandable } from "./Expandable";

const paragraph =
  "Deze ruime woning ligt aan een van de mooiste grachten van de stad. De woonkamer heeft een originele visgraatvloer, hoge plafonds met ornamenten en openslaande deuren naar de tuin.";

const meta = {
  title: "UI/Expandable",
  component: Expandable,
  args: {
    summary: <p className="text-base/7">{paragraph}</p>,
    children: (
      <div className="space-y-4 text-base/7">
        <p>{paragraph}</p>
        <p>{paragraph}</p>
        <p>{paragraph}</p>
      </div>
    ),
  },
  parameters: { layout: "padded" },
} satisfies Meta<typeof Expandable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole("button", { name: /Lees meer/ });
    const region = document.getElementById(toggle.getAttribute("aria-controls")!);

    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(region).not.toBeVisible();

    await userEvent.click(toggle);

    await expect(canvas.getByRole("button", { name: /Lees minder/ })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    await expect(region).toBeVisible();

    await userEvent.click(toggle);

    await expect(canvas.getByRole("button", { name: /Lees meer/ })).toBeInTheDocument();
    await expect(region).not.toBeVisible();
  },
};

export const NotCollapsible: Story = {
  args: { collapsible: false },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.queryByRole("button")).not.toBeInTheDocument();
    await expect(canvas.getAllByText(paragraph)).toHaveLength(3);
  },
};

export const CustomLabels: Story = {
  args: { expandLabel: "Alle kenmerken tonen", collapseLabel: "Minder kenmerken tonen" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button", { name: /Alle kenmerken tonen/ }));
    await expect(
      canvas.getByRole("button", { name: /Minder kenmerken tonen/ }),
    ).toBeInTheDocument();
  },
};
