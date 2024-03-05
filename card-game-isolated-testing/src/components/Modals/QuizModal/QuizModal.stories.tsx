import type { Meta, StoryObj } from "@storybook/react";
import QuizModal from "./QuizModal";
import ImageProviderV5 from "../../../context/GlobalContext/GlobalContext";

const meta: Meta<typeof QuizModal> = {
  title: "GENERA/Modals/QuizModal",
  component: QuizModal,
  parameters: {
    layout: "screen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof QuizModal>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultProps: Story["args"] = {};

export const Default: Story = {
  render: (args) => (
    <ImageProviderV5 setLoading={() => false}>
      <div className="w-screen h-screen">
        <QuizModal {...args} />
      </div>
    </ImageProviderV5>
  ),
  args: {
    ...DefaultProps,
  },
};
