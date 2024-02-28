import type { Meta, StoryObj } from "@storybook/react";
import QuarryGoBackBtn from "./QuarryGoBackBtn";
import ImageProviderV5 from "../../../../../context/GlobalContext/GlobalContext";

const meta: Meta<typeof QuarryGoBackBtn> = {
  title: "Genera/Quarries/QuarryGoBackBtn",
  component: QuarryGoBackBtn,
  parameters: {
    layout: "screen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof QuarryGoBackBtn>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultProps: Story["args"] = {};

export const Default: Story = {
  render: (props) => (
    <ImageProviderV5 setLoading={() => false}>
      <QuarryGoBackBtn {...props} />
    </ImageProviderV5>
  ),
  args: {
    ...DefaultProps,
  },
};
