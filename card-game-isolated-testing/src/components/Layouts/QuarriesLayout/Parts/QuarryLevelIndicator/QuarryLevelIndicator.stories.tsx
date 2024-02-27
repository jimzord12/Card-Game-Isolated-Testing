import type { Meta, StoryObj } from "@storybook/react";
import QuarryLevelIndicator from "./QuarryLevelIndicator";
import ImageProviderV5 from "../../../../../context/GlobalContext/GlobalContext";

const meta: Meta<typeof QuarryLevelIndicator> = {
  title: "Genera/Quarries/QuarryLevelIndicator",
  component: QuarryLevelIndicator,
  parameters: {
    layout: "screen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof QuarryLevelIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultProps: Story["args"] = {
  level: 1,
  type: "concrete",
};

export const ExtraSmall: Story = {
  render: (args) => (
    <ImageProviderV5 setLoading={() => false}>
      <QuarryLevelIndicator {...args} />
    </ImageProviderV5>
  ),
  args: {
    ...DefaultProps,
    forceSize: "extraSmall",
  },
};

export const Small: Story = {
  render: (args) => (
    <ImageProviderV5 setLoading={() => false}>
      <QuarryLevelIndicator {...args} />
    </ImageProviderV5>
  ),
  args: {
    ...DefaultProps,
    forceSize: "small",
  },
};

export const Medium: Story = {
  render: (args) => (
    <ImageProviderV5 setLoading={() => false}>
      <QuarryLevelIndicator {...args} />
    </ImageProviderV5>
  ),
  args: {
    ...DefaultProps,
    forceSize: "medium",
  },
};

export const Large: Story = {
  render: (args) => (
    <ImageProviderV5 setLoading={() => false}>
      <QuarryLevelIndicator {...args} />
    </ImageProviderV5>
  ),
  args: {
    ...DefaultProps,
    forceSize: "large",
  },
};
