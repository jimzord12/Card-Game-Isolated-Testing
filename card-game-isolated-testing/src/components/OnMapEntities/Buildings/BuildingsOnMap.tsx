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
// import { useGameVarsStore } from "../../../stores/gameVars";
import LevelUpLayout from "../../Layouts/LevelUpLayout/LevelUpLayout";
import AmusementParkMainScreen from "../../Layouts/MainScreenLayout/BuildingsLayouts/MainScreens/AmusementParkMainScreen";
import HospitalLayoutMainScreen from "../../Layouts/MainScreenLayout/BuildingsLayouts/MainScreens/HospitalLayoutMainScreen";
import RadioStationMainScreen from "../../Layouts/MainScreenLayout/BuildingsLayouts/MainScreens/RadioStationMainScreen";
import ToolStoreMainScreen from "../../Layouts/MainScreenLayout/BuildingsLayouts/MainScreens/ToolStoreMainScreen";
import HospitalManageScreen from "../../Layouts/ManageLayout/HospitalManageScreen";
import { updatePlayerData } from "../../../../api/apiFns";
import { useGameVarsStore } from "../../../stores/gameVars";
import ToolStoreManageScreen from "../../Layouts/ManageLayout/ToolStoreManageScreen/ToolStoreManageScreen";
import { isToolStore } from "../../../types/TypeGuardFns/isToolStore";
import ToolStoreLvlUpScreen from "../../Layouts/LevelUpLayout/ToolStoreLvlUpScreen/ToolStoreLvlUpScreen";

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
  const gameVars = useGameVarsStore;
  const prevDoctors = useGameVarsStore(
    (state) => state.allWorkers.hospitalWorkers
  );
  const playerData = useGameVarsStore((state) => state.player);

  const { images } = UseGlobalContext();
  if (images?.modal_backgrounds === undefined)
    throw new Error("⛔ BuildingsOnMap: images are undefined!");

  const handleOpenStandardModal = useCallback((selectedCard: BuildingCard) => {
    const modalsProps = {
      label: rarityToString(selectedCard.rarity),
      bgImage: images?.modal_backgrounds[getModalBgImage(selectedCard.name)],
      level: selectedCard.level,
      card: selectedCard,
    };

    if (isActiveBuilding(selectedCard.name)) {
      if (selectedCard.name === "ToolStore" && isToolStore(selectedCard)) {
        pushModal(
          <StandardModal
            {...modalsProps}
            contentType="toolStore"
            contentScreens={[
              <ToolStoreMainScreen card={selectedCard} />,
              <ToolStoreManageScreen card={selectedCard} />,
              <ToolStoreLvlUpScreen card={selectedCard} />,
            ]}
          />
        );
      } else {
        pushModal(
          <StandardModal
            {...modalsProps}
            contentType="hospital"
            contentScreens={[
              <HospitalLayoutMainScreen card={selectedCard} />,
              <HospitalManageScreen card={selectedCard} />,
              <LevelUpLayout card={selectedCard} />,
            ]}
            onClose={() => {
              console.log("🐱‍🏍 Closing Hopsital...");
              const currentDoctors =
                gameVars.getState().allWorkers.hospitalWorkers;
              console.log("🐱‍🏍 currentDoctors: ", currentDoctors);
              console.log("🐱‍🏍 prevDoctors: ", prevDoctors);
              if (prevDoctors === currentDoctors) return;
              console.log("🐱‍🏍 Updating Hospital Workers...");
              if (playerData === null || playerData.id === undefined)
                throw new Error(
                  "⛔ BuildingsOnMap.tsx: Hospital::OnClose:: Player ID is undefined!"
                );
              updatePlayerData(playerData?.id, {
                workers_hospital: currentDoctors,
              });
            }}
          />
        );
      }
    } else {
      if (selectedCard.name === "AmusementPark") {
        pushModal(
          <StandardModal
            {...modalsProps}
            contentType="building-passive"
            contentScreens={[
              <AmusementParkMainScreen card={selectedCard} />,
              <LevelUpLayout card={selectedCard} />,
            ]}
          />
        );
      } else if (selectedCard.name === "RadioStation") {
        pushModal(
          <StandardModal
            {...modalsProps}
            contentType="building-passive"
            contentScreens={[
              <RadioStationMainScreen card={selectedCard} />,
              <LevelUpLayout card={selectedCard} />,
            ]}
          />
        );
      }
    }
  }, []);

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
