import type { Meta, StoryObj } from "@storybook/react";
import ResourceToolLine from "./ResourceToolLine";
import ImageProviderV5 from "../../../../../../context/GlobalContext/GlobalContext";
import BuildingCard from "../../../../../../classes/buildingClass_V2";
import { nameToTemplateDataBuilding } from "../../../../../../constants/templates";
import { isToolStore } from "../../../../../../types/TypeGuardFns/isToolStore";

const meta: Meta<typeof ResourceToolLine> = {
  title: "Genera/Labels/ToolStoreLabels/ResourceToolLine",
  component: ResourceToolLine,
  parameters: {
    layout: "screen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ResourceToolLine>;

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
  resType: "crystals",
  size: "extraSmall",
};

export const Default: Story = {
  render: (args) => (
    <ImageProviderV5 setLoading={() => false}>
      <ResourceToolLine {...args} />
    </ImageProviderV5>
  ),
  args: {
    ...DefaultProps,
  },
};
