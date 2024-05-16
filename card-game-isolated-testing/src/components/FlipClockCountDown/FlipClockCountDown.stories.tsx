import type { Meta, StoryObj } from "@storybook/react";
import FlipClockCountDown from "./FlipClockCountDown";

const meta: Meta<typeof FlipClockCountDown> = {
  title: "Timers/FlipClockCountDown",
  component: FlipClockCountDown,
  parameters: {
    layout: "screen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FlipClockCountDown>;

export default meta;
type Story = StoryObj<typeof meta>;

const testDate = new Date();
testDate.setHours(testDate.getHours() + 3);

const DefaultProps: Story["args"] = {
  targetDate: testDate,
  textColor: "red",
};

export const Default: Story = {
  args: {
    ...DefaultProps,
  },
};
