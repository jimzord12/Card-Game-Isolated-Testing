import { UseGlobalContext } from "../../../../context/GlobalContext/GlobalContext";
import {
  CardType,
  TemplateDataBuilding,
  TemplateDataReg,
  TemplateDataSP,
} from "../../../../types";
import CardLayout from "../../Parts/CardLayout/CardLayout";

// type Building = Record<BuildingName, TemplateDataBuilding>;
// type REG = Record<RegName, TemplateDataReg>;
// type SP = Record<SPName, TemplateDataSP>;

// type TemplateData = TemplateDataBuilding | TemplateDataReg | TemplateDataSP;

interface Props {
  onClick: () => void;
  type?: CardType;
  selectedCardTemplateId: number;
  setSelectedCard: React.Dispatch<React.SetStateAction<number | null>>;
  // currentModal: "Inventory" | "Craft";
}

/**
 * @description This component is used to render a Card. Its called CardTemplate, because it is used to render any card type.
 * @param param0
 * @returns
 */
const ForCraftingCard = ({
  onClick,
  type,
  selectedCardTemplateId,
  setSelectedCard,
}: Props) => {
  const { images } = UseGlobalContext();

  if (images === undefined)
    throw new Error("⛔ ForCraftingCard : images is undefined");

  const handleCardClick = () => {
    if (setSelectedCard !== null) return;
    if (currentModal === "Craft") {
      // console.log('asdbas: ', props);
      setSelectedCard(cardTemplateData?.id);
      return;
    }
    // props.setSelectedCard(props.id);
    setSelectedCard(template.id);
    // setChoosenCard(true);
    // handleCardClickScroll();
    // console.log(
    //   `The ${props.name}, Type: ${props.type}, Level: ${props.level} - Was Clicked!`,
    //   props
    // );
    // console.log(`Card.jsx: Is a Card Selected?: `, setSelectedCard !== null);
  };

  if (type === "building") {
    return (
      <CardLayout
        // size={size}
        frameImg={images.frames.buildingCardFrame}
        cardData={cardTemplateData as TemplateDataBuilding}
        onClick={onClick}
        isForCrafting={true}
        // spot={spot}
      />
    );
  } else if (type === "reg") {
    return (
      <CardLayout
        // size={size}
        frameImg={images.frames.regCardFrame}
        cardData={cardTemplateData as TemplateDataReg}
        onClick={onClick}
        isForCrafting={true}
        // spot={spot}
      />
    );
  } else {
    return (
      <CardLayout
        // size={size}
        frameImg={images.frames.spCardFrame}
        cardData={cardTemplateData as TemplateDataSP}
        onClick={onClick}
        isForCrafting={true}
        // spot={spot}
      />
    );
  }
};

export default ForCraftingCard;
