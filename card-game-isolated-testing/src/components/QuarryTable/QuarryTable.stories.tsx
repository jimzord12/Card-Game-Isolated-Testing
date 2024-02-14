import type { Meta, StoryObj } from "@storybook/react";
import QuarryTable from "./QuarryTable";

const meta: Meta<typeof QuarryTable> = {
  title: "Genera/Quarries/QuarryTable",
  component: QuarryTable,
  parameters: {
    layout: "screen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof QuarryTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultProps = {
  
};

export const Default: Story = {
  args: {
    ...DefaultProps,
  },
};