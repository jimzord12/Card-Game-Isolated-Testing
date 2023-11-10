import { Dispatch, SetStateAction } from "react";
import { TownMapEntitiesData } from "../../../types";
import GlowImage from "../../GlowImage/GlowImage";
import "./buildings.css";

// interface ImageDetail {
//   id: number;
//   src: string;
//   alt: string;
//   isHovered: boolean;
//   spot: number;
// }

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
        card?.type !== "building" ? null : (
          <div
            key={card.id}
            className={`buildingSpot${spot}`}
            onClick={() => setSelectedMapEntity(card.id)}
          >
            <GlowImage
              key={card.id}
              src={card.img}
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
