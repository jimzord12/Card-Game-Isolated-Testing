import type { StoryObj, Meta } from "@storybook/react";

import ActionSectionBtn, { ActionSectionBtnProps } from "./ActionSectionBtn";

// START - Meta data that Storybook uses to display the component
const meta: Meta<typeof ActionSectionBtn> = {
  title: "Genera/Modals/ActionSectionBtn",
  component: ActionSectionBtn,
  argTypes: {},
  tags: ["autodocs"],
};

export default meta;
// END - Meta data that Storybook uses to display the component

// ✨ Creating a Story Type specifically for our component
type Story = StoryObj<typeof meta>;

const DefaultArgs: ActionSectionBtnProps = {
  text: "Click me",
  clickHandler: () => console.log("Clicked"),
};

export const Base: Story = {
  args: { ...DefaultArgs },
};

export const Disabled: Story = {
  args: { ...DefaultArgs, text: "Can't click me", isDisabled: true },
};
