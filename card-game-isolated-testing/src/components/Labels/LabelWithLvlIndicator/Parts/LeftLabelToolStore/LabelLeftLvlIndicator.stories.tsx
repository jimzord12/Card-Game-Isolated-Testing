import type { Meta, StoryObj } from "@storybook/react";
import LabelLeftLvlIndicator from "./LabelLeftLvlIndicator";
import ImageProviderV5 from "../../../../../context/GlobalContext/GlobalContext";
import labels from "../../../../../assets/imgs_new_convention/labels";

const meta: Meta<typeof LabelLeftLvlIndicator> = {
  title: "Genera/Labels/LabelLeftLvlIndicator",
  component: LabelLeftLvlIndicator,
  parameters: {
    layout: "screen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LabelLeftLvlIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultProps: Story["args"] = {
  desc: {
    text: "Current Boost",
  },
  isStoryBook: true,
  labelImages: labels,
  labelType: "rusty",
  size: "extraSmall",
  value: 0.25,
  valueType: {
    type: "%",
  },
};

export const ExtraSmall: Story = {
  render: (args) => (
    <ImageProviderV5 setLoading={() => false}>
      <LabelLeftLvlIndicator {...args} />
    </ImageProviderV5>
  ),
  args: {
    ...DefaultProps,
  },
};

export const Small: Story = {
  render: (args) => (
    <ImageProviderV5 setLoading={() => false}>
      <LabelLeftLvlIndicator {...args} />
    </ImageProviderV5>
  ),
  args: {
    ...DefaultProps,
    size: "small",
    desc: {
      text: "New Boost",
    },
  },
};

export const Medium: Story = {
  render: (args) => (
    <ImageProviderV5 setLoading={() => false}>
      <LabelLeftLvlIndicator {...args} />
    </ImageProviderV5>
  ),
  args: {
    ...DefaultProps,
    size: "medium",
  },
};

export const Large: Story = {
  render: (args) => (
    <ImageProviderV5 setLoading={() => false}>
      <LabelLeftLvlIndicator {...args} />
    </ImageProviderV5>
  ),
  args: {
    ...DefaultProps,
    size: "large",
  },
};
