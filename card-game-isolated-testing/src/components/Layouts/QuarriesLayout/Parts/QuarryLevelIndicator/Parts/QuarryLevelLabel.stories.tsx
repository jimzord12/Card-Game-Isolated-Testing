import type { Meta, StoryObj } from "@storybook/react";
import QuarryLevelLabel from "./QuarryLevelLabel";
import ImageProviderV5 from "../../../../../../context/GlobalContext/GlobalContext";

const meta: Meta<typeof QuarryLevelLabel> = {
  title: "Genera/Quarries/QuarryLevelLabel",
  component: QuarryLevelLabel,
  parameters: {
    layout: "screen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof QuarryLevelLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultProps: Story["args"] = {
  level: 4,
};

export const Default: Story = {
  render: (args) => (
    <ImageProviderV5 setLoading={() => false}>
      <QuarryLevelLabel {...args} />
    </ImageProviderV5>
  ),
  args: {
    ...DefaultProps,
  },
};
