import BuildingCard from "../../../../../classes/buildingClass_V2";
import BuildingCardDetailsSection from "../../CardDetailsSection/BuildingCardDetailsSection";
import RadioStationOutputSection from "../../CardOutputSection/BuildingsOutputSections/RadioStationOutputSection";

interface BuildingCardDetailsSectionProps {
  card: BuildingCard;
}

const RadioStationMainScreen = ({ card }: BuildingCardDetailsSectionProps) => {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      <div className="flex flex-col tablet:flex-row w-full h-full gap-4">
        <BuildingCardDetailsSection card={card} />
        <RadioStationOutputSection card={card} />
      </div>
    </div>
  );
};

export default RadioStationMainScreen;
