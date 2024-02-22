import type { Meta, StoryObj } from "@storybook/react";
import ToolLevelIndicator from "./ToolLevelIndicator";
import ImageProviderV5 from "../../../../../context/GlobalContext/GlobalContext";

const meta: Meta<typeof ToolLevelIndicator> = {
  title: "Genera/Labels/ToolStoreLabels/ToolLevelIndicator",
  component: ToolLevelIndicator,
  parameters: {
    layout: "screen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ToolLevelIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultProps: Story["args"] = {
  level: 2,
  size: "extraSmall",
};

export const ExtraSmall: Story = {
  render: (args) => (
    <ImageProviderV5 setLoading={() => false}>
      <ToolLevelIndicator {...args} />
    </ImageProviderV5>
  ),
  args: {
    ...DefaultProps,
  },
};

export const Small: Story = {
  render: (args) => (
    <ImageProviderV5 setLoading={() => false}>
      <ToolLevelIndicator {...args} />
    </ImageProviderV5>
  ),
  args: {
    ...DefaultProps,
    size: "small",
  },
};

export const Medium: Story = {
  render: (args) => (
    <ImageProviderV5 setLoading={() => false}>
      <ToolLevelIndicator {...args} />
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
      <ToolLevelIndicator {...args} />
    </ImageProviderV5>
  ),
  args: {
    ...DefaultProps,
    size: "large",
  },
};
