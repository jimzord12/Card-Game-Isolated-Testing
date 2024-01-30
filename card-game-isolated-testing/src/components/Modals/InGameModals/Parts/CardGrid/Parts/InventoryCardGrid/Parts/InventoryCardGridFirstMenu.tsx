import React from "react";
import { CardClass } from "../../../../../../../../types";
import CompleteCard from "../../../../../../../Cards/CardTemplates/CompleteCard/CompleteCard";

interface Props {
  cards: CardClass[];
  setSelectedCard: React.Dispatch<React.SetStateAction<CardClass | null>>;
}
const InventoryCardGridFirstMenu = ({ cards, setSelectedCard }: Props) => {
  if (cards === undefined || setSelectedCard === undefined)
    throw new Error("⛔ InventroyCardGrid: FirstMenu: cards is undefined");

  console.log("InventroyCardGridFirstMenu: Cards: ", cards);
  return (
    <div className="flex flex-row gap-6 md-custom:flex-wrap">
      {cards.map((card, index) => {
        return (
          <CompleteCard
            card={card}
            setSelectedCard={setSelectedCard}
            currentModal="Craft"
            key={`InventroyCardGrid-${card.name}-${card.id}-${index}`}
          />
        );
      })}
    </div>
  );
};

export default InventoryCardGridFirstMenu;
