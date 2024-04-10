import type { Meta, StoryObj } from "@storybook/react";
import SimpleSpinner from "./SimpleSpinner";

const meta: Meta<typeof SimpleSpinner> = {
  title: "Genera/Comps/SimpleSpinner",
  component: SimpleSpinner,
  parameters: {
    layout: "screen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SimpleSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultProps: Story["args"] = {};

export const Default: Story = {
  args: {
    ...DefaultProps,
  },
};
