import type { Meta, StoryObj } from "@storybook/react";
import SoundManager from "./SoundManager";

const meta: Meta<typeof SoundManager> = {
  title: "Genera/Comp",
  component: SoundManager,
  parameters: {
    layout: "screen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SoundManager>;

export default meta;
type Story = StoryObj<typeof meta>;

const audio = new Audio("sounds/Forest-Frolic-Loop.mp3");

audio.loop = true;
audio.volume = 0.15;

const DefaultProps: Story["args"] = { audio };

export const Default: Story = {
  args: {
    ...DefaultProps,
  },
};
