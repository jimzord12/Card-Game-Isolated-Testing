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
    <div className="flex flex-row gap-6 flex-wrap p-8 tablet:pt-12">
      {cards.length > 0 ? (
        cards.map((card, index) => {
          return (
            <CompleteCard
              card={card}
              setSelectedCard={setSelectedCard}
              currentModal="Inventory"
              key={`InventroyCardGrid-${card.name}-${card.id}-${index}`}
            />
          );
        })
      ) : (
        <div className="text-3xl text-slate-800 tablet:text-5xl">
          No cards in the Inventory
        </div>
      )}
    </div>
  );
};

export default InventoryCardGridFirstMenu;
