import { Dispatch, SetStateAction, useCallback } from "react";
import { cardUrlsWithShadow } from "../../../constants/cards/cardImageUrls/withShadow";
import { BuildingName, TownMapEntitiesData } from "../../../types";
import { isBuildingCard } from "../../../types/TypeGuardFns/BuildingGuards";
import GlowImage from "../../GlowImage/GlowImage";
import "./buildings.css";

import { useModalStore } from "../../../stores/modalStore";
import { ActionsSectionAction } from "../../../types/ModalTypes/ActionsSectionTypes";
import StandardModal from "../../Modals/StandardModal/StandardModal";

interface Props {
  highlightedImg: number | null;
  handleHover: (id: number) => void;
  handleLeave: (id: number) => void;
  setSelectedMapEntity: Dispatch<SetStateAction<number | null>>;
  mapEntities: TownMapEntitiesData;
}

const buildingActions = (cardName: BuildingName): ActionsSectionAction[] => {
  if (cardName === "AmusementPark" || cardName === "RadioStation") {
    return [
      { text: "Level Up", handler: () => {} },
      { text: "Manage Workers", handler: () => {} },
    ];
  } else {
    return [
      { text: "Level Up", handler: () => {} },
      { text: "Manage Workers", handler: () => {} },
    ];
  }
};

const BuildingsOnMap = ({
  highlightedImg,
  handleHover,
  handleLeave,
  setSelectedMapEntity,
  mapEntities,
}: Props) => {
  const pushModal = useModalStore((state) => state.pushModal);

  const handleOpenStandardModal = useCallback(
    (cardName: BuildingName /*cardId: number*/) => {
      if (cardName === "AmusementPark" || cardName === "RadioStation") {
        {
          /* TODO: Make This for PASSIVE Buildings*/
        }

        pushModal(
          <StandardModal
            level={1}
            rarityOrName={1}
            actions={buildingActions(cardName)}
            // onConfirm={() => {
            //   console.log("✅ You pressed the Confirm Button!");
            // }}
            // onCancel={() => {
            //   console.log("❌ You pressed the Cancel Button!");
            // }}
          >
            <div></div>
          </StandardModal>
        );
      } else {
        {
          /* TODO: Make This for ACTIVE Buildings*/
        }
        pushModal(
          <StandardModal
            level={1}
            rarityOrName={1}
            actions={buildingActions(cardName)}
            // onConfirm={() => {
            //   console.log("✅ You pressed the Confirm Button!");
            // }}
            // onCancel={() => {
            //   console.log("❌ You pressed the Cancel Button!");
            // }}
          >
            <div></div>
          </StandardModal>
        );
      }
    },
    [pushModal]
  );
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
            onClick={() => {
              setSelectedMapEntity(card.id);
              handleOpenStandardModal(card.name);
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
        )
      )}
    </div>
  );
};

export default BuildingsOnMap;
