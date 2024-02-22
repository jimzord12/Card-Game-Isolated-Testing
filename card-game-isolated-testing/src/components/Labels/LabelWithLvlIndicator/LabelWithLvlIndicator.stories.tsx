import type { Meta, StoryObj } from "@storybook/react";
import LabelWithLvlIndicator from "./LabelWithLvlIndicator";
import labels from "../../../assets/imgs_new_convention/labels";
import ImageProviderV5 from "../../../context/GlobalContext/GlobalContext";

const meta: Meta<typeof LabelWithLvlIndicator> = {
  title: "Genera/Labels/ToolStoreLabels/LabelWithLvlIndicator",
  component: LabelWithLvlIndicator,
  parameters: {
    layout: "screen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LabelWithLvlIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultProps: Story["args"] = {
  isStoryBook: true,
  size: "extraSmall",
  labelImages: labels,
  labelType: "golden",
  value: 200,
  valueType: {
    type: "/h",
  },
  desc: {
    text: "Crystal Workers",
  },
};

export const Default: Story = {
  render: (args) => (
    <ImageProviderV5 setLoading={() => false}>
      <LabelWithLvlIndicator {...args} />
    </ImageProviderV5>
  ),
  args: {
    ...DefaultProps,
  },
};
