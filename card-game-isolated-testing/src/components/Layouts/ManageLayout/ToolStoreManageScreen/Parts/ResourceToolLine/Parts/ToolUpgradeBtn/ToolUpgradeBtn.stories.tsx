import type { Meta, StoryObj } from "@storybook/react";
import ToolUpgradeBtn from "./ToolUpgradeBtn";
import ImageProviderV5 from "../../../../../../../../context/GlobalContext/GlobalContext";
import BuildingCard from "../../../../../../../../classes/buildingClass_V2";
import { nameToTemplateDataBuilding } from "../../../../../../../../constants/templates";
import { isToolStore } from "../../../../../../../../types/TypeGuardFns/isToolStore";

const meta: Meta<typeof ToolUpgradeBtn> = {
  title: "Genera/Labels/ToolStoreLabels/ToolUpgradeBtn",
  component: ToolUpgradeBtn,
  parameters: {
    layout: "screen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ToolUpgradeBtn>;

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
  onClick: () => console.log("Clicked!"),
  size: "extraSmall",
};

export const ExtraSmall: Story = {
  render: (args) => (
    <ImageProviderV5 setLoading={() => false}>
      <ToolUpgradeBtn {...args} />
    </ImageProviderV5>
  ),
  args: {
    ...DefaultProps,
  },
};

export const Small: Story = {
  render: (args) => (
    <ImageProviderV5 setLoading={() => false}>
      <ToolUpgradeBtn {...args} />
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
      <ToolUpgradeBtn {...args} />
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
      <ToolUpgradeBtn {...args} />
    </ImageProviderV5>
  ),
  args: {
    ...DefaultProps,
    size: "large",
  },
};
