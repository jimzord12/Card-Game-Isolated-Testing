import BuildingCard from "../../../../../classes/buildingClass_V2";
import { ToolStoreType } from "../../../../../types";
import { isToolStore } from "../../../../../types/TypeGuardFns/isToolStore";
import BuildingCardDetailsSection from "../../CardDetailsSection/BuildingCardDetailsSection";
import ToolStoreOutputSection from "../../CardOutputSection/BuildingsOutputSections/ToolStoreOutputSection";

interface BuildingCardDetailsSectionProps {
  card: BuildingCard;
}

const ToolStoreMainScreen = ({ card }: BuildingCardDetailsSectionProps) => {
  if (isToolStore(card) === false)
    throw new Error("⛔ ToolStoreMainScreen.tsx: The card is not a ToolStore!");

  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      <div className="flex flex-col largeScreen:flex-row w-full h-full gap-4">
        <BuildingCardDetailsSection card={card as ToolStoreType} />
        <ToolStoreOutputSection card={card as ToolStoreType} />
      </div>
    </div>
  );
};

export default ToolStoreMainScreen;
