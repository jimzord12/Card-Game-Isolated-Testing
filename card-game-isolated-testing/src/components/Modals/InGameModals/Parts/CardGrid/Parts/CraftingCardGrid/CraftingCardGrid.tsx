import React from "react";
import { CardClass } from "../../../../../../../types";
import CraftingCardGridSecondMenu from "./Parts/CraftingCardGridSecondMenu";
import CraftingCardGridFirstMenu from "./Parts/CraftingCardGridFirstMenu";

interface Props {
  selectedCard: CardClass | null;
  cards: CardClass[];
  setSelectedCard: React.Dispatch<React.SetStateAction<CardClass | null>>;
  handleCraftClick: (card: CardClass) => void;
}

const CraftingCardGrid = ({
  selectedCard,
  cards,
  setSelectedCard,
  handleCraftClick,
}: Props) => {
  if (
    cards === undefined ||
    setSelectedCard === undefined ||
    selectedCard === undefined
  )
    throw new Error(
      "⛔ CraftingCardGrid: cards | setSelectedCard | selectedCard is undefined"
    );

  // console.log(" --- CraftingCardGrid: cards: ", cards);
  return (
    <div>
      {selectedCard === null ? (
        <CraftingCardGridFirstMenu
          cards={cards}
          setSelectedCard={setSelectedCard}
        />
      ) : (
        <CraftingCardGridSecondMenu
          selectedCard={selectedCard}
          handleCraftClick={handleCraftClick}
        />
      )}
    </div>
  );
};

export default CraftingCardGrid;
