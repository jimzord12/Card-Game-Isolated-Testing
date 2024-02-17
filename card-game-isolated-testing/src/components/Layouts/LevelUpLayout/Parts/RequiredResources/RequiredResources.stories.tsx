import type { Meta, StoryObj } from "@storybook/react";
import RequiredResources from "./RequiredResources";
import BuildingCard from "../../../../../classes/buildingClass_V2";
import ImageProviderV5 from "../../../../../context/GlobalContext/GlobalContext";

const meta: Meta<typeof RequiredResources> = {
  title: "Genera/Layouts/RequiredResources",
  component: RequiredResources,
  parameters: {
    layout: "screen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof RequiredResources>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultPropsForLayouts: Story["args"] = {
  card: BuildingCard.createNew({
    ownerId: 333,
    playerName: "Rush B",
    templateId: 103,
  }),
};

export const Default: Story = {
  render: (props) => (
    <ImageProviderV5 setLoading={() => true}>
      <RequiredResources {...props} />
    </ImageProviderV5>
  ),
  args: {
    ...DefaultPropsForLayouts,
  },
};
