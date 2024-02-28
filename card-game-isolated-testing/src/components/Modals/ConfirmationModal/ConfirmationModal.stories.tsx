import type { Meta, StoryObj } from "@storybook/react";

import ConfirmationModal from "./ConfirmationModal";
import Backdrop from "../Backdrop/Backdrop";

const meta = {
  title: "Genera/Modals/ConfirmationModal",
  component: ConfirmationModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],

  argTypes: {},
} satisfies Meta<typeof ConfirmationModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => (
    <Backdrop index={1}>
      <ConfirmationModal {...args} />
    </Backdrop>
  ),
  args: {
    title: "Confirmation",
    message: "Are you sure you want to perform the level up?",
    onConfirm: () => console.log("Confirmed!"),
    onCancel: () => console.log("Cancelled!"),
  },
};
