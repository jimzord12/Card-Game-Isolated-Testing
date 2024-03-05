import type { Meta, StoryObj } from "@storybook/react";
import QuestionTimer from "./QuestionTimer";

const meta: Meta<typeof QuestionTimer> = {
  title: "GENERA/Modals/QuizModal/QuestionTimer",
  component: QuestionTimer,
  parameters: {
    layout: "screen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof QuestionTimer>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultProps: Story["args"] = {
  duration: 10,
};

export const Default: Story = {
  args: {
    ...DefaultProps,
  },
};
