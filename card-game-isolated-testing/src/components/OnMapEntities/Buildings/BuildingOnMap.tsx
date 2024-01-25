import { Dispatch, SetStateAction } from "react";
import BuildingCard from "../../../classes/buildingClass_V2";
import { cardUrlsWithShadow } from "../../../constants/cards/cardImageUrls/withShadow";
import { BuildingSpot } from "../../../types";
import GlowImage from "../../GlowImage/GlowImage";

interface BuildingOnMapProps {
  card: BuildingCard;
  spot: BuildingSpot | null;
  setSelectedMapEntity: Dispatch<SetStateAction<number | null>>;
  handleOpenStandardModal: (selectedCard: BuildingCard) => void;
  highlightedImg: number | null;
  handleHover: (id: number) => void;
  handleLeave: (id: number) => void;
}

const BuildingOnMap = ({
  card,
  spot,
  setSelectedMapEntity,
  handleOpenStandardModal,
  highlightedImg,
  handleHover,
  handleLeave,
}: BuildingOnMapProps) => {
  if (spot === null) throw new Error("⛔ BuildingOnMap: spot is null!");
  return (
    <div
      key={card.id}
      className={`buildingSpot${spot}`}
      onClick={() => {
        // At this point we can manage the card...
        setSelectedMapEntity(card.id);
        handleOpenStandardModal(card);
      }}
    >
      <GlowImage
        key={card.id}
        src={cardUrlsWithShadow.buildings[card.name]}
        alt={card.name}
        isHovered={highlightedImg === card.id}
        onHover={() => handleHover(card.id)}
        onLeave={() => handleLeave(card.id)}
      />
    </div>
  );
};

export default BuildingOnMap;
