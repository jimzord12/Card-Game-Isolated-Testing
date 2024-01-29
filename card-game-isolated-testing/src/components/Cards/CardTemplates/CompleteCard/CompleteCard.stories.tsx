import type { Meta, StoryObj } from "@storybook/react";
import CompleteCard from "./CompleteCard";

const meta: Meta<typeof CompleteCard> = {
  title: "Genera/CompleteCard",
  component: CompleteCard,
  parameters: {
    layout: "screen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CompleteCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultProps = {};

export const Default: Story = {
  args: {
    ...DefaultProps,
  },
};
