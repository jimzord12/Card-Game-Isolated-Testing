import type { Meta, StoryObj } from "@storybook/react";
import Label from "./Label";
import labels from "../../../assets/imgs_new_convention/labels";

const meta: Meta<typeof Label> = {
  title: "Genera/Labels/Label",
  component: Label,
  parameters: {
    layout: "screen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isStoryBook: true,
    type: "simple",
    value: "Testing",
    size: "large",
    desc: {
      text: "This is a test desc",
    },
    labelImages: labels,
  },
};

export const ExtraSmall: Story = {
  args: {
    isStoryBook: true,
    type: "golden",
    value: "Extra Small",
    size: "extraSmall",
    desc: {
      text: "This is a test desc",
    },
    labelImages: labels,
  },
};
