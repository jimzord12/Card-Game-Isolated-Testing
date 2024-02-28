import type { Meta, StoryObj } from "@storybook/react";
import CardCategory from "./CardCategory";
import { cardCategoryImgs } from "../../../assets/craftAndInvModals/cardCategoryImgs";

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
    onClick: () => console.log("Clicked Building Category"),
    text: "Building",
  },
};

export const RegCategory: Story = {
  args: {
    image: cardCategoryImgs.REG_Category,
    handleSimpleCardSelection: () => console.log("Clicked REG Category"),
    text: "REG",
  },
};

export const SPCategory: Story = {
  args: {
    image: cardCategoryImgs.SP_Category,
    handleSimpleCardSelection: () => console.log("Clicked SP Category"),
    text: "Special Effect",
  },
};
