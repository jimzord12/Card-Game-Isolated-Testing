import type { Meta, StoryObj } from "@storybook/react";
import CardCategory from "./CardCategory";
import { cardCategoryImgs } from "../../../assets/craftAndInvModals/cardCategoryImgs";
import { action } from "@storybook/addon-actions";

const meta: Meta<typeof CardCategory> = {
  title: "Genera/CardCategory",
  component: CardCategory,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CardCategory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BuildingCategory = {
  args: {
    image: cardCategoryImgs.buildingCategory,
    onClick: action("Clicked Building Category"),
    text: "Building",
  },
};

export const RegCategory: Story = {
  args: {
    image: cardCategoryImgs.REG_Category,
    handleSimpleCardSelection: action("Clicked REG Category"),
    text: "REG",
  },
};

export const SPCategory: Story = {
  args: {
    image: cardCategoryImgs.SP_Category,
    handleSimpleCardSelection: action("Clicked SP Category"),
    text: "Special Effect",
  },
};
