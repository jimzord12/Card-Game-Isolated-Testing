import BuildingCard from "../../../../../../../../../classes/buildingClass_V2";
import RegCard from "../../../../../../../../../classes/regClass_V2";

const SecondsMenuSection = ({
  currentlySelectedCard,
  category,
  context,
}: {
  currentlySelectedCard: BuildingCard | RegCard;
  category: "requirements" | "output" | "maintenance";
  context: "craft" | "inventory";
}) => {
  return (
    <>
      {Object.entries(currentlySelectedCard[category]).map(
        ([key, value], index) => (
          <li key={`noSE-${category}-Prop-${index}`} className="single-card-li">
            <span className={`single-card-maintenance-prop`}>
              {key}:{` `}
            </span>
            <span className={`single-card-maintenance-value`}>
              {context === "craft" ? "???" : value}
            </span>
          </li>
        )
      )}
    </>
  );
};

export default SecondsMenuSection;
