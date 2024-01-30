import SPCard from "../../../../../../../../../classes/spClass_V2";

const SecondsMenuSectionSP = ({
  currentlySelectedCard,
  category,
  context,
}: {
  currentlySelectedCard: SPCard;
  category: "requirements" | "output";
  context: "craft" | "inventory";
}) => {
  return (
    <>
      {Object.entries(currentlySelectedCard[category]).map(
        ([key, value], index) => {
          if (value === 0 || value === undefined || value === null) return null;
          return (
            <li
              key={`noSE-${category}-Prop-${index}`}
              className="single-card-li"
            >
              <span className={`single-card-maintenance-prop`}>
                {key}:{` `}
              </span>
              <span className={`single-card-maintenance-value`}>
                {/* // TODO: Replace ??? with the range of possible values. See the Rarity Mulitpliers. */}
                {context === "craft" && category === "output" ? "???" : value}
              </span>
            </li>
          );
        }
      )}
    </>
  );
};

export default SecondsMenuSectionSP;
