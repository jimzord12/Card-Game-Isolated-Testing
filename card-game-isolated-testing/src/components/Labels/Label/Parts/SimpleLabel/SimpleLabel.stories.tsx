import type { Meta, StoryObj } from "@storybook/react";
import SimpleLabel from "./SimpleLabel";

const meta: Meta<typeof SimpleLabel> = {
  title: "Genera/Labels/Parts/SimpleLabel",
  component: SimpleLabel,
  parameters: {
    layout: "screen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SimpleLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: "small",
    bgColorHex: "#076b07",
    borderColorHex: "#023002",
    borderWidthPx: 5,
    value: "Testing",
  },
};
