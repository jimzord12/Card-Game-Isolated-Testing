import React from "react";
import {
  BuildingTemplateId,
  CardClass,
  RegTemplateId,
  SPTemplateId,
} from "../../../../../../../types";
import CompleteCard from "../../../../../../Cards/CardTemplates/CompleteCard/CompleteCard";
import { findCardTypeFromTemplateId } from "../../../../../../../utils/game";
import BuildingCard from "../../../../../../../classes/buildingClass_V2";
import RegCard from "../../../../../../../classes/regClass_V2";
import SPCard from "../../../../../../../classes/spClass_V2";

interface Props {
  selectedCardTemplateId: number;
  cards: CardClass[];
  setSelectedCard: React.Dispatch<React.SetStateAction<number | null>>;
}

const CraftingCardGrid = ({
  selectedCardTemplateId,
  cards,
  setSelectedCard,
}: Props) => {
  if (
    cards === undefined ||
    setSelectedCard === undefined ||
    selectedCardTemplateId === undefined
  )
    throw new Error(
      "⛔ CraftingCardGrid: cards | setSelectedCard | selectedCardTemplateId is undefined"
    );
  return (
    <div>
      {selectedCardTemplateId !== null ? (
        <FirstMenu cards={cards} setSelectedCard={setSelectedCard} />
      ) : (
        <SecondMenu selectedCardTemplateId={selectedCardTemplateId} />
      )}
    </div>
  );
};

const FirstMenu = ({ cards, setSelectedCard }: Partial<Props>) => {
  if (cards === undefined || setSelectedCard === undefined)
    throw new Error("⛔ CraftingCardGrid: FirstMenu: cards is undefined");
  return (
    <div>
      {cards.map((card) => {
        return (
          <CompleteCard
            card={card}
            setSelectedCard={setSelectedCard}
            currentModal="Craft"
          />
        );
      })}
    </div>
  );
};



export default CraftingCardGrid;
