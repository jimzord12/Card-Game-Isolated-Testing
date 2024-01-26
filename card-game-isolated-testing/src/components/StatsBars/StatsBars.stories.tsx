import type { Meta, StoryObj } from "@storybook/react";

import StatsBar from "./StatsBars";

const meta = {
  title: "Genera/StatsBars",
  component: StatsBar,
  parameters: {
    layout: "screen",
  },
  tags: ["docs"],
} satisfies Meta<typeof StatsBar>;

export default meta;
type Story = StoryObj<typeof StatsBar>;

export const Default: Story = {
  args: {
    resourcesToDisplay: {
      concrete: 100,
      metals: 100,
      crystals: 100,
      diesel: 100,
    },
    statsToDisplay: {
      gold: 100000,
      population: 100000,
      energy: 100000,
      rank: 100000,
    },
  },
};
