import type { Meta, StoryObj } from "@storybook/nextjs-vite";

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

export const Default: Story = {};

/** Content short enough to show in full loses the disclosure entirely. */
export const NotCollapsible: Story = {
  args: { collapsible: false },
};

export const CustomLabels: Story = {
  args: { expandLabel: "Alle kenmerken tonen", collapseLabel: "Minder kenmerken tonen" },
};
