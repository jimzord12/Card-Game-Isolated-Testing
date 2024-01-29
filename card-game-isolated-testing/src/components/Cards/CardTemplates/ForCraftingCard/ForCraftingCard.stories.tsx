import type { Meta, StoryObj } from "@storybook/react";
import ForCraftingCard from "./ForCraftingCard";

const meta: Meta<typeof ForCraftingCard> = {
  title: "Genera/ForCraftingCard",
  component: ForCraftingCard,
  parameters: {
    layout: "screen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ForCraftingCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultProps = {};

export const Default: Story = {
  args: {
    ...DefaultProps,
  },
};
