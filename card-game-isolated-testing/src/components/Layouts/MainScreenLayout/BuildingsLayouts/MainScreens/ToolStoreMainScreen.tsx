import BuildingCard from "../../../../../classes/buildingClass_V2";
import BuildingCardDetailsSection from "../../CardDetailsSection/BuildingCardDetailsSection";
import ToolStoreOutputSection from "../../CardOutputSection/BuildingsOutputSections/ToolStoreOutputSection";

interface BuildingCardDetailsSectionProps {
  card: BuildingCard;
}

const ToolStoreMainScreen = ({ card }: BuildingCardDetailsSectionProps) => {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      <div className="flex flex-col tablet:flex-row w-full h-full gap-4">
        <BuildingCardDetailsSection card={card} />
        <ToolStoreOutputSection card={card} />
      </div>
    </div>
  );
};

export default ToolStoreMainScreen;
