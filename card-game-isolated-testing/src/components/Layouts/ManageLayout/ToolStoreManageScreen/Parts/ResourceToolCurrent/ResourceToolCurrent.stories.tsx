import type { Meta, StoryObj } from "@storybook/react";
import ResourceToolCurrent from "./ResourceToolCurrent";
import ImageProviderV5 from "../../../../../../context/GlobalContext/GlobalContext";
import BuildingCard from "../../../../../../classes/buildingClass_V2";
import { nameToTemplateDataBuilding } from "../../../../../../constants/templates";
import { isToolStore } from "../../../../../../types/TypeGuardFns/isToolStore";
import labels from "../../../../../../assets/imgs_new_convention/labels";

const meta: Meta<typeof ResourceToolCurrent> = {
  title: "Genera/Labels/ToolStoreLabels/ResourceToolCurrent",
  component: ResourceToolCurrent,
  parameters: {
    layout: "screen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ResourceToolCurrent>;

export default meta;
type Story = StoryObj<typeof meta>;

const testCard = BuildingCard.createNew({
  ownerId: 1,
  playerName: "Player 1",
  templateId: nameToTemplateDataBuilding.ToolStore.id,
});

testCard.levelUpTool("concrete");

if (!isToolStore(testCard)) throw new Error("⛔ testCard is not a ToolStore!");

const DefaultProps: Story["args"] = {
  card: testCard,
  resType: "concrete",
  size: "extraSmall",
  isStoryBook: true,
  labelImages: labels,
  toolType: "concrete",
};

export const Default: Story = {
  render: (args) => (
    <ImageProviderV5 setLoading={() => false}>
      <ResourceToolCurrent {...args} />
    </ImageProviderV5>
  ),
  args: {
    ...DefaultProps,
  },
};
