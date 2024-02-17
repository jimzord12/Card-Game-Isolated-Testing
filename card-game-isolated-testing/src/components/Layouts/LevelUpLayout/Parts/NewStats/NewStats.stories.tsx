import type { Meta, StoryObj } from "@storybook/react";
import NewStats from "./NewStats";
import ImageProviderV5 from "../../../../../context/GlobalContext/GlobalContext";
import { DefaultPropsForLayouts } from "../RequiredResources/RequiredResources.stories";

const meta: Meta<typeof NewStats> = {
  title: "Genera/Layouts/NewStats",
  component: NewStats,
  parameters: {
    layout: "screen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof NewStats>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (props) => (
    <ImageProviderV5 setLoading={() => true}>
      <NewStats {...props} />
    </ImageProviderV5>
  ),
  args: {
    ...DefaultPropsForLayouts,
  },
};
