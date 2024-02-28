import type { Meta, StoryObj } from "@storybook/react";
import CardLayout from "./CardLayout";
import { frames } from "../../../../assets/imgs_new_convention/frames";
import BuildingCard from "../../../../classes/buildingClass_V2";
import RegCard from "../../../../classes/regClass_V2";
import SPCard from "../../../../classes/spClass_V2";

const meta: Meta<typeof CardLayout> = {
  title: "Genera/Cards/CardLayout",
  component: CardLayout,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CardLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ForCraftingBuilding: Story = {
  args: {
    card: BuildingCard.createNew({
      ownerId: 1,
      playerName: "Player 1",
      templateId: 101,
    }),
    frameImg: frames.buildingCardFrame,
    currentModal: "Craft",

    onClick: () => console.log("Selected [AmusementPark] for Crafting"),
  },
};

export const ForCraftingREG: Story = {
  args: {
    card: RegCard.createNew({
      ownerId: 1,
      playerName: "Player 2",
      templateId: 201,
    }),
    frameImg: frames.regCardFrame,
    currentModal: "Craft",

    onClick: () => console.log("Selected [SimpleSolarPanel] for Crafting"),
  },
};

export const ForCraftingSP: Story = {
  args: {
    card: SPCard.createNew({
      ownerId: 1,
      playerName: "Player 3",
      templateId: 301,
    }),

    frameImg: frames.spCardFrame,
    currentModal: "Craft",
    onClick: () => console.log("Selected [LoveApp] for Crafting"),
  },
};

////////  COMPLETE CARD  ////////

export const CompleteBuilding: Story = {
  args: {
    card: BuildingCard.createNew({
      ownerId: 1,
      playerName: "Player 1",
      templateId: 104,
    }),
    frameImg: frames.buildingCardFrame,
    currentModal: "Inventory",
    onClick: () => console.log("Selected [104] for Crafting"),
  },
};

export const CompleteREG: Story = {
  args: {
    card: RegCard.createNew({
      ownerId: 1,
      playerName: "Player 2",
      templateId: 204,
    }),
    frameImg: frames.regCardFrame,
    currentModal: "Inventory",

    onClick: () => console.log("Selected [204] for Crafting"),
  },
};

export const CompleteSP: Story = {
  args: {
    card: SPCard.createNew({
      ownerId: 1,
      playerName: "Player 3",
      templateId: 301,
    }),
    frameImg: frames.spCardFrame,
    currentModal: "Inventory",

    onClick: () => console.log("Selected [301] for Crafting"),
  },
};
