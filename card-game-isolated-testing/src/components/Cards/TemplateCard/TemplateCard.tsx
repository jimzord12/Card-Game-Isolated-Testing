import { UseGlobalContext } from "../../../context/GlobalContext/GlobalContext";
import {
  CardType,
  TemplateDataBuilding,
  TemplateDataReg,
  TemplateDataSP,
} from "../../../types";
import CardLayout from "../Parts/CardLayout/CardLayout";

// type Building = Record<BuildingName, TemplateDataBuilding>;
// type REG = Record<RegName, TemplateDataReg>;
// type SP = Record<SPName, TemplateDataSP>;

interface Props {
  //   size: number;
  onClick: () => void;
  cardTemplateData: TemplateDataBuilding | TemplateDataReg | TemplateDataSP;
  type: CardType;
  // spot: CardSpot;
}

const TemplateCard = ({ onClick, cardTemplateData, type }: Props) => {
  const { images } = UseGlobalContext();

  if (images === undefined)
    throw new Error("⛔ TemplateCard : images is undefined");

  console.log("SKTAadasD: ", images);

  if (type === "building") {
    return (
      <CardLayout
        // size={size}
        frameImg={images.frames.buildingCardFrame}
        cardData={cardTemplateData as TemplateDataBuilding}
        onClick={onClick}
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
        // spot={spot}
      />
    );
  }
};

export default TemplateCard;
