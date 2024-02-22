import type { Meta, StoryObj } from "@storybook/react";
import ToolUpgradeDiff from "./ToolUpgradeDiff";
import ImageProviderV5 from "../../../../../../../../context/GlobalContext/GlobalContext";
import labels from "../../../../../../../../assets/imgs_new_convention/labels";
import BuildingCard from "../../../../../../../../classes/buildingClass_V2";
import { nameToTemplateDataBuilding } from "../../../../../../../../constants/templates";
import { isToolStore } from "../../../../../../../../types/TypeGuardFns/isToolStore";

const meta: Meta<typeof ToolUpgradeDiff> = {
  title: "Genera/Labels/ToolStoreLabels/ToolUpgradeDiff",
  component: ToolUpgradeDiff,
  parameters: {
    layout: "screen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ToolUpgradeDiff>;

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
  labelImages: labels,
  size: "extraSmall",
  isStoryBook: true,
  card: testCard,
  toolType: "concrete",
};

export const ExtraSmall: Story = {
  render: (args) => (
    <ImageProviderV5 setLoading={() => false}>
      <ToolUpgradeDiff {...args} />
    </ImageProviderV5>
  ),
  args: {
    ...DefaultProps,
  },
};

export const Small: Story = {
  render: (args) => (
    <ImageProviderV5 setLoading={() => false}>
      <ToolUpgradeDiff {...args} />
    </ImageProviderV5>
  ),
  args: {
    ...DefaultProps,
    size: "small",
  },
};

export const Medium: Story = {
  render: (args) => (
    <ImageProviderV5 setLoading={() => false}>
      <ToolUpgradeDiff {...args} />
    </ImageProviderV5>
  ),
  args: {
    ...DefaultProps,
    size: "medium",
  },
};

export const Large: Story = {
  render: (args) => (
    <ImageProviderV5 setLoading={() => false}>
      <ToolUpgradeDiff {...args} />
    </ImageProviderV5>
  ),
  args: {
    ...DefaultProps,
    size: "large",
  },
};
