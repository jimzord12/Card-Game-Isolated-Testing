import type { StoryObj, Meta } from "@storybook/react";

import CustomInput, { CustomInputProps } from "./CustomInput";
import useInput from "../../hooks/useInput";

// START - Meta data that Storybook uses to display the component
const meta = {
  title: "Genera/CustomInput",
  component: CustomInput,
  argTypes: {},
  tags: ["autodocs"],
} satisfies Meta<typeof CustomInput>;

export default meta;
// END - Meta data that Storybook uses to display the component

// Wrapper Component
const CustomInputWithHook = (
  props: Omit<CustomInputProps, "Attribs" | "value">
) => {
  const [, , attributeObj] = useInput("customInput", "");
  return <CustomInput {...props} Attribs={attributeObj} />;
};

// ✨ Creating a Story Type specifically for our component
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: (args) => <CustomInputWithHook {...args} />,
  args: {
    label: "Custom Input",
    isDisabled: false,
    copyToClipboard: false,
  },
};

export const WithPlaceholder: Story = {
  render: (args) => <CustomInputWithHook {...args} />,
  args: {
    label: "Custom Input",
    placeHolder: "Enter your name",
    isDisabled: false,
    copyToClipboard: false,
  },
};

export const Disabled: Story = {
  render: (args) => <CustomInputWithHook {...args} />,
  args: {
    label: "Disabled Input",
    isDisabled: true,
  },
};

export const Using_the_Value_Prop: Story = {
  render: (args) => <CustomInputWithHook {...args} />,
  args: {
    label: "Input with value",
    value: "0x3n4ojhr9fdws9232asd34",
  },
};
