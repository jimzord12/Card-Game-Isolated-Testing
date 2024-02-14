import type { Meta, StoryObj } from "@storybook/react";
import CustomSlider from "./CustomSlider";

const meta: Meta<typeof CustomSlider> = {
  title: "Genera/CustomSlider",
  component: CustomSlider,
  parameters: {
    layout: "screen",
  },
  tags: ["autodocs"],
  //   argTypes: {
  //     size: {
  //       control: {
  //         type: "radio",
  //         options: ["small", "medium", "large"],
  //       },
  //     },
  //   },
} satisfies Meta<typeof CustomSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultProps: Story["args"] = {
  max: 100,
  onChange: (newValue: number) => {
    console.log(newValue, "newValue");
    return newValue;
  },
};

export const Default: Story = {
  args: { ...DefaultProps },
};

export const InitialValue: Story = {
  args: {
    ...DefaultProps,
    initValue: 50,
  },
};

export const BigStep: Story = {
  args: { ...DefaultProps, step: 20 },
};

export const SmallSize: Story = {
  args: { ...DefaultProps, size: "small" },
};

export const MediumSize: Story = {
  args: { ...DefaultProps, size: "medium" },
};

export const LargeSize: Story = {
  args: { ...DefaultProps, size: "large" },
};

export const ErrorWrongStepperValue: Story = {
  args: { ...DefaultProps, step: 99 },
};
