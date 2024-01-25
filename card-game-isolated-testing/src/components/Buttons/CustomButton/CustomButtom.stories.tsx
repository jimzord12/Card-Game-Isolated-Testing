import type { StoryObj, Meta } from "@storybook/react";

import CustomButton, { CustomButtonProps } from "./CustomButton";

// START - Meta data that Storybook uses to display the component
const meta: Meta<typeof CustomButton> = {
  title: "Genera/CustomButton",
  component: CustomButton,
  argTypes: {},
  tags: ["autodocs"],
};

export default meta;
// END - Meta data that Storybook uses to display the component

// ✨  Creating a Story Type specifically for our component
type Story = StoryObj<typeof meta>;

const DefaultArgs: CustomButtonProps = {
  title: "Click me",
  handleClick: () => console.log("Clicked"),
  isDisabled: false,
  restStyles: "",
};

export const Base: Story = {
  args: { ...DefaultArgs },
};

export const Disabled: Story = {
  args: { ...DefaultArgs, title: "Can't click me", isDisabled: true },
};

export const MoreStyles: Story = {
  args: {
    ...DefaultArgs,
    title: "Hover me",
    restStyles: "bg-amber-700 text-[#ffffff] hover:bg-violet-400",
  },
};

// const Template: Story = (args) => <CustomButton {...args} />;
