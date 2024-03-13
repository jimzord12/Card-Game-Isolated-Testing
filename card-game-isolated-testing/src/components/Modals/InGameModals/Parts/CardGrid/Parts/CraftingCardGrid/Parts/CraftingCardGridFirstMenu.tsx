import { CardClass } from "../../../../../../../../types";
import CompleteCard from "../../../../../../../Cards/CardTemplates/CompleteCard/CompleteCard";

interface CraftingCardGridFirstMenuProps {
  cards: CardClass[];
  setSelectedCard: React.Dispatch<React.SetStateAction<CardClass | null>>;
}

const CraftingCardGridFirstMenu = ({
  cards,
  setSelectedCard,
}: CraftingCardGridFirstMenuProps) => {
  if (cards === undefined || setSelectedCard === undefined)
    throw new Error("⛔ CraftingCardGrid: FirstMenu: cards is undefined");

  // console.log("CraftingCardGridFirstMenu: Cards: ", cards);
  return (
    <div className="flex flex-row gap-6 mt-6">
      {cards.map((card, index) => {
        return (
          <CompleteCard
            card={card}
            setSelectedCard={setSelectedCard}
            currentModal="Craft"
            key={`CraftingCardGrid-${card.name}-${card.id}-${index}`}
          />
        );
      })}
    </div>
  );
};

export default CraftingCardGridFirstMenu;
