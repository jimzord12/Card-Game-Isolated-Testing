import { Dispatch, SetStateAction, useCallback } from "react";
// import { cardUrlsWithShadow } from "../../../constants/cards/cardImageUrls/withShadow";
import { BuildingSpot, TownMapEntitiesData } from "../../../types";
import {
  isBuildingCard,
  isBuildingSpot,
} from "../../../types/TypeGuardFns/BuildingGuards";
// import GlowImage from "../../GlowImage/GlowImage";
import "./buildings.css";

import { useModalStore } from "../../../stores/modalStore";
import StandardModal from "../../Modals/StandardModal/StandardModal";
import { rarityToString } from "../../../utils/game/rarityToString";
import BuildingCard from "../../../classes/buildingClass_V2";
import { UseGlobalContext } from "../../../context/GlobalContext/GlobalContext";
import { getModalBgImage } from "../../../utils/game/getModalBgImage";
import { isActiveBuilding } from "../../../types/TypeGuardFns/isActiveBuilding";
import BuildingOnMap from "./BuildingOnMap";

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
  const pushModal = useModalStore((state) => state.pushModal);
  const { images } = UseGlobalContext();
  if (images?.modal_backgrounds === undefined)
    throw new Error("⛔ BuildingsOnMap: images are undefined!");

  const handleOpenStandardModal = useCallback(
    (selectedCard: BuildingCard) => {
      const modalsProps = {
        label: rarityToString(selectedCard.rarity),
        bgImage: images?.modal_backgrounds[getModalBgImage(selectedCard.name)],
        level: selectedCard.level,
        card: selectedCard,
      };

      if (isActiveBuilding(selectedCard.name)) {
        if (selectedCard.name === "ToolStore") {
          pushModal(
            <StandardModal
              {...modalsProps}
              contentType="toolStore"
              contentScreens={[
                <div style={{ fontSize: 42, color: "white" }}>
                  toolStore Main Screen #1
                </div>,
                <div style={{ fontSize: 42, color: "white" }}>
                  toolStore Mangement Screen #2
                </div>,
                <div style={{ fontSize: 42, color: "white" }}>
                  toolStore Level Up Screen #3
                </div>,
              ]}
            />
          );
        } else if (selectedCard.name === "Hospital") {
          pushModal(
            <StandardModal
              {...modalsProps}
              contentType="hospital"
              contentScreens={[
                <div style={{ fontSize: 42, color: "white" }}>
                  Hospital Main Screen #1
                </div>,
                <div style={{ fontSize: 42, color: "white" }}>
                  Hospital Management Screen #2
                </div>,
                <div style={{ fontSize: 42, color: "white" }}>
                  Hospital Level Up Screen #3
                </div>,
              ]}
            />
          );
        }
      } else {
        pushModal(
          <StandardModal
            {...modalsProps}
            contentType="building-passive"
            contentScreens={[
              <div style={{ fontSize: 42, color: "white" }}>
                PassiveB Screen #1
              </div>,
            ]}
          />
        );
      }
    },
    [images?.modal_backgrounds, pushModal]
  );
  return (
    <div>
      {Object.entries(mapEntities).map(([spot, card]) =>
        card === null ||
        card?.type === undefined ||
        card?.type !== "building" ||
        !isBuildingCard(card) ? null : (
          <BuildingOnMap
            card={card}
            handleHover={handleHover}
            handleLeave={handleLeave}
            highlightedImg={highlightedImg}
            handleOpenStandardModal={handleOpenStandardModal}
            setSelectedMapEntity={setSelectedMapEntity}
            spot={
              isBuildingSpot(parseInt(spot))
                ? (parseInt(spot) as BuildingSpot)
                : null
            }
            key={card.id}
          />
          // // TODO_DONE ✅: START - Make this a seperate Component, BuildingOnMap
          // <div
          //   key={card.id}
          //   className={`buildingSpot${spot}`}
          //   onClick={() => {
          //     // At this point we can manage the card...
          //     setSelectedMapEntity(card.id);
          //     handleOpenStandardModal(card);
          //   }}
          // >
          //   <GlowImage
          //     key={card.id}
          //     src={cardUrlsWithShadow.buildings[card.name]}
          //     alt={card.name}
          //     isHovered={highlightedImg === card.id}
          //     onHover={() => handleHover(card.id)}
          //     onLeave={() => handleLeave(card.id)}
          //   />
          // </div>
          // // END - Make this a seperate Component, BuildingOnMap
        )
      )}
    </div>
  );
};

export default BuildingsOnMap;
