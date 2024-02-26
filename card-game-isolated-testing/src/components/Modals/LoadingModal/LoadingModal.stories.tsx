import type { Meta, StoryObj } from "@storybook/react";

import LoadingModal from "./LoadingModal";
import Backdrop from "../Backdrop/Backdrop";

const meta = {
  title: "Genera/Modals/LoadingModal",
  component: LoadingModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],

  argTypes: {},
} satisfies Meta<typeof LoadingModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => (
    <Backdrop index={1}>
      <LoadingModal {...args} />
    </Backdrop>
  ),
  args: {},
};
