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
    btnType: "primary",
    text: "Primary",
    onClick: action("The Game Button was clicked!"),
  },
};

export const Secondary: Story = {
  args: {
    btnType: "secondary",
    text: "Primary",
    onClick: action("The Game Button was clicked!"),
  },
};

export const Danger: Story = {
  args: {
    btnType: "danger",
    text: "Primary",
    onClick: action("The Game Button was clicked!"),
  },
};
