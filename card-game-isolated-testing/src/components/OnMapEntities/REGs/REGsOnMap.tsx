import { Dispatch, SetStateAction } from "react";
import { cardUrlsWithShadow } from "../../../constants/cards/cardImageUrls/withShadow";
import { TownMapEntitiesData } from "../../../types";
import { isRegCard } from "../../../types/TypeGuardFns/RegGuards";

import GlowImage from "../../GlowImage/GlowImage";
import "./solar.css";
import "./wind.css";

interface Props {
  highlightedImg: number | null;
  handleHover: (id: number) => void;
  handleLeave: (id: number) => void;
  setSelectedMapEntity: Dispatch<SetStateAction<number | null>>;
  mapEntities: TownMapEntitiesData;
}

const RegsOnMap = ({
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
        card?.type !== "reg" ||
        !isRegCard(card) ? null : (
          <div
            key={card.id}
            className={
              card.name.includes("Wind")
                ? `regSpotWind${spot}`
                : `regSpotSolar${spot}`
            }
            onClick={() => setSelectedMapEntity(card.id)}
          >
            <GlowImage
              key={card.id}
              src={cardUrlsWithShadow.reg[card.name]}
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

export default RegsOnMap;
