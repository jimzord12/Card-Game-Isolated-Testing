import React from "react";
import { CardClass } from "../../../../../../../types";
import InventoryCardGridFirstMenu from "./Parts/InventoryCardGridFirstMenu";
import InventoryCardGridSecondMenu from "./Parts/InventoryCardGridSecondMenu";

interface Props {
  selectedCard: CardClass | null;
  cards: CardClass[];
  setSelectedCard: React.Dispatch<React.SetStateAction<CardClass | null>>;
  handleSell: (card: CardClass) => void;
  handleLevelUp: (card: CardClass) => void;
}

const InventoryCardGrid = ({
  cards,
  handleSell,
  handleLevelUp,
  selectedCard,
  setSelectedCard,
}: Props) => {
  if (
    cards === undefined ||
    setSelectedCard === undefined ||
    selectedCard === undefined
  )
    throw new Error(
      "⛔ InventoryCardGrid: cards | setSelectedCard | selectedCard is undefined"
    );

  console.log(" --- InventoryCardGrid: cards: ", cards);
  return (
    <div>
      {selectedCard === null ? (
        <InventoryCardGridFirstMenu
          cards={cards}
          setSelectedCard={setSelectedCard}
        />
      ) : (
        <InventoryCardGridSecondMenu
          selectedCard={selectedCard}
          handleSell={handleSell}
          handleLevelUp={handleLevelUp}
        />
      )}
    </div>
  );
};

export default InventoryCardGrid;
