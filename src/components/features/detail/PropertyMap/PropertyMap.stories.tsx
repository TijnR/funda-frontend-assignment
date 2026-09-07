import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Activity, useState } from "react";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { PropertyMap } from "./PropertyMap.client";

const MAP_LIFECYCLE_ERROR = /appendChild|Map container is being reused by another instance/;

function ActivityHarness(props: React.ComponentProps<typeof PropertyMap>) {
  const [visible, setVisible] = useState(true);

  return (
    <>
      <button type="button" onClick={() => setVisible((current) => !current)}>
        {visible ? "Kaart verbergen" : "Kaart tonen"}
      </button>
      <Activity mode={visible ? "visible" : "hidden"}>
        <PropertyMap {...props} />
      </Activity>
    </>
  );
}

const meta = {
  title: "Features/Detail/PropertyMap",
  component: ActivityHarness,
  args: {
    address: "Keizersgracht 241 A",
    latitude: 52.370216,
    longitude: 4.895168,
  },
  parameters: { layout: "padded" },
} satisfies Meta<typeof ActivityHarness>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RestoresAfterActivityNavigation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const lifecycleErrors: string[] = [];
    const captureLifecycleError = (event: ErrorEvent) => {
      if (MAP_LIFECYCLE_ERROR.test(event.message)) lifecycleErrors.push(event.message);
    };

    window.addEventListener("error", captureLifecycleError);

    try {
      const expectSingleMap = async () => {
        await waitFor(() =>
          expect(canvasElement.querySelectorAll(".leaflet-container")).toHaveLength(1),
        );
        await waitFor(() =>
          expect(canvasElement.querySelector(".leaflet-tile-pane")).toBeVisible(),
        );
      };

      await expectSingleMap();

      // Two round trips, because the second one only survives if the first cleaned up after itself.
      for (let visit = 0; visit < 2; visit += 1) {
        await userEvent.click(canvas.getByRole("button", { name: "Kaart verbergen" }));
        await userEvent.click(canvas.getByRole("button", { name: "Kaart tonen" }));
        await expectSingleMap();
      }

      await expect(lifecycleErrors).toEqual([]);
    } finally {
      window.removeEventListener("error", captureLifecycleError);
    }
  },
};
