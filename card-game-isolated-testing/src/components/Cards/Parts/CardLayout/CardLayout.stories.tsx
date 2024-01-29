import type { Meta, StoryObj } from "@storybook/react";
import CardLayout from "./CardLayout";
import {
  nameToTemplateDataBuilding,
  nameToTemplateDataREG,
  nameToTemplateDataSP,
} from "../../../../constants/templates";
import { frames } from "../../../../assets/imgs_new_convention/frames";
import { action } from "@storybook/addon-actions";
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
    cardData: nameToTemplateDataBuilding["AmusementPark"],
    frameImg: frames.buildingCardFrame,
    isForCrafting: true,
    onClick: action("Selected [AmusementPark] for Crafting"),
  },
};

export const ForCraftingREG: Story = {
  args: {
    cardData: nameToTemplateDataREG["SimpleSolarPanel"],
    frameImg: frames.regCardFrame,
    isForCrafting: true,
    onClick: action("Selected [SimpleSolarPanel] for Crafting"),
  },
};

export const ForCraftingSP: Story = {
  args: {
    cardData: nameToTemplateDataSP["LoveApp"],
    frameImg: frames.spCardFrame,
    isForCrafting: true,
    onClick: action("Selected [LoveApp] for Crafting"),
  },
};

////////  COMPLETE CARD  ////////

export const CompleteBuilding: Story = {
  args: {
    cardData: BuildingCard.createNew({
      ownerId: 1,
      playerName: "Player 1",
      templateId: 104,
    }),
    frameImg: frames.buildingCardFrame,
    isForCrafting: false,
    onClick: action("Selected [104] for Crafting"),
  },
};

export const CompleteREG: Story = {
  args: {
    cardData: RegCard.createNew({
      ownerId: 1,
      playerName: "Player 2",
      templateId: 204,
    }),
    frameImg: frames.regCardFrame,
    isForCrafting: false,
    onClick: action("Selected [204] for Crafting"),
  },
};

export const CompleteSP: Story = {
  args: {
    cardData: SPCard.createNew({
      ownerId: 1,
      playerName: "Player 3",
      templateId: 301,
    }),
    frameImg: frames.spCardFrame,
    isForCrafting: false,
    onClick: action("Selected [301] for Crafting"),
  },
};
