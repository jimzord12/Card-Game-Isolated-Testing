import type { Meta, StoryObj } from "@storybook/react";

import AwesomeProcessBar from "./AwesomeProcessBar";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Experiments/AwesomeProcessBar",
  component: AwesomeProcessBar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    // backgroundColor: { control: "color" },
    // size: {
    // control: { type: "select", options: ["small", "medium", "large"] }, //  Converts Radio Buttons -> Select Menu
    // },
  },
} satisfies Meta<typeof AwesomeProcessBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const HalfWay: Story = {
  args: {
    text: "25.000/50.000",
    percentage: 50,
  },
};

export const AlmostDone: Story = {
  args: {
    text: "Loading",
    percentage: 90,
  },
};

export const EarlyOn: Story = {
  args: {
    text: "Awesome Process Bar",
    percentage: 10,
  },
};
