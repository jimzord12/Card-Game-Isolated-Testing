import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import GameButton from "./GameButton";

const meta = {
  title: "Genera/GameButton",
  component: GameButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof GameButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    type: "primary",
    text: "Primary",
    action: action("The Game Button was clicked!"),
  },
};

export const Secondary: Story = {
  args: {
    type: "secondary",
    text: "Secondary",
    action: action("The Game Button was clicked!"),
  },
};

export const Anchor: Story = {
  args: {
    type: "anchor",
    text: "Anchor",
    action: action("The Game Button was clicked!"),
  },
};

export const Danger: Story = {
  args: {
    type: "danger",
    text: "Danger",
    action: action("The Game Button was clicked!"),
  },
};
