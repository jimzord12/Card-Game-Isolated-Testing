import BuildingCard from "../../../../../classes/buildingClass_V2";
import BuildingCardDetailsSection from "../../CardDetailsSection/BuildingCardDetailsSection";
import AmusementParkOutputSection from "../../CardOutputSection/BuildingsOutputSections/AmusementParkOutputSection";

interface BuildingCardDetailsSectionProps {
  card: BuildingCard;
}

const AmusementParkMainScreen = ({ card }: BuildingCardDetailsSectionProps) => {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      <div className="flex flex-col tablet:flex-row w-full h-full gap-4">
        <BuildingCardDetailsSection card={card} />
        <AmusementParkOutputSection card={card} />
      </div>
    </div>
  );
};

export default AmusementParkMainScreen;
