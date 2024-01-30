import BuildingCard from "../../../../classes/buildingClass_V2";
import RegCard from "../../../../classes/regClass_V2";
import SPCard from "../../../../classes/spClass_V2";
import { UseGlobalContext } from "../../../../context/GlobalContext/GlobalContext";
import { CardClass } from "../../../../types";
import { isBuildingCard } from "../../../../types/TypeGuardFns/BuildingGuards";
import { isRegCard } from "../../../../types/TypeGuardFns/RegGuards";
import CardLayout from "../../Parts/CardLayout/CardLayout";

// type Building = Record<BuildingName, TemplateDataBuilding>;
// type REG = Record<RegName, TemplateDataReg>;
// type SP = Record<SPName, TemplateDataSP>;

interface Props {
  card: CardClass;
  setSelectedCard?: React.Dispatch<React.SetStateAction<CardClass | null>>;
  currentModal?: "Inventory" | "Craft";
  onClick?: () => void;
}

/**
 * @description This component is used to render a Card. Its called CardTemplate, because it is used to render any card type.
 * @param param0
 * @returns
 */
const CompleteCard = ({
  setSelectedCard,
  card,
  currentModal,
  onClick,
}: Props) => {
  const { images } = UseGlobalContext();

  if (images === undefined)
    throw new Error("⛔ CompleteCard : images is undefined");

  const handleCardClick = () => {
    if (onClick !== undefined) {
      onClick();
    } else if (setSelectedCard === undefined) {
      return;
    } else if (currentModal === "Craft") {
      setSelectedCard(card);
    } else if (currentModal === "Inventory") {
      setSelectedCard(card);
    } else {
      throw new Error("⛔ CompleteCard: currentModal is not set!");
    }
  };

  if (isBuildingCard(card)) {
    return (
      <CardLayout
        frameImg={images.frames.buildingCardFrame}
        cardData={card as BuildingCard}
        onClick={handleCardClick}
        isForCrafting={false}
        currentModal={currentModal}
      />
    );
  } else if (isRegCard(card)) {
    return (
      <CardLayout
        frameImg={images.frames.regCardFrame}
        cardData={card as RegCard}
        onClick={handleCardClick}
        isForCrafting={false}
        currentModal={currentModal}
      />
    );
  } else {
    return (
      <CardLayout
        frameImg={images.frames.spCardFrame}
        cardData={card as SPCard}
        onClick={handleCardClick}
        isForCrafting={false}
        currentModal={currentModal}
      />
    );
  }
};

export default CompleteCard;
