import { Dispatch, SetStateAction } from "react";
import { cardUrlsWithShadow } from "../../../constants/cards/cardImageUrls/withShadow";
import { TownMapEntitiesData } from "../../../types";
import { isBuildingCard } from "../../../types/TypeGuardFns/BuildingGuards";
import GlowImage from "../../GlowImage/GlowImage";
import "./buildings.css";

interface Props {
  highlightedImg: number | null;
  handleHover: (id: number) => void;
  handleLeave: (id: number) => void;
  setSelectedMapEntity: Dispatch<SetStateAction<number | null>>;
  mapEntities: TownMapEntitiesData;
}

const BuildingsOnMap = ({
  highlightedImg,
  handleHover,
  handleLeave,
  setSelectedMapEntity,
  mapEntities,
}: Props) => {
  return (
    <div>
      {Object.entries(mapEntities).map(([spot, card]) =>
        card === null ||
        card?.type === undefined ||
        card?.type !== "building" ||
        !isBuildingCard(card) ? null : (
          <div
            key={card.id}
            className={`buildingSpot${spot}`}
            onClick={() => setSelectedMapEntity(card.id)}
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
        )
      )}
    </div>
  );
};

export default BuildingsOnMap;
