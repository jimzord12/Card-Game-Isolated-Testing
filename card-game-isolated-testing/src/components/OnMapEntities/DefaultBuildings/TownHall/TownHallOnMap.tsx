import { Dispatch, SetStateAction, useCallback } from "react";
import { UseGlobalContext } from "../../../../context/GlobalContext/GlobalContext";
import { useGameVarsStore } from "../../../../stores/gameVars";
import { useModalStore } from "../../../../stores/modalStore";
import GlowImage from "../../../GlowImage/GlowImage";
import StandardModal from "../../../Modals/StandardModal/StandardModal";
import "../defaultBuildings.css";
import TownHallModalMainScreen from "./TownHallModalLayout/Screens/TownHallModalMainScreen";
import DefaultBuildingsLvlUpScreen from "../../../Layouts/LevelUpLayout/defaultBuildings/DefaultBuildingsLvlUpScreen";
import TownHallManageScreen from "../../../Layouts/ManageLayout/TownHallManageScreen/TownHallManageScreen";
import { updatePlayerData } from "../../../../../api/apiFns";
import { compareWorkers } from "../../../../utils/game/compareWorkers";

interface Props {
  highlightedImg: number | null;
  handleHover: (id: number) => void;
  handleLeave: (id: number) => void;
  setSelectedMapEntity: Dispatch<SetStateAction<number | null>>;
}

const TownHallOnMap = ({
  highlightedImg,
  handleHover,
  handleLeave,
  setSelectedMapEntity,
}: Props) => {
  const { images } = UseGlobalContext();

  // Zustand ModalStore
  const pushModal = useModalStore((state) => state.pushModal);
  const prevWorkers = useGameVarsStore((state) => state.allWorkers);
  const playerId = useGameVarsStore((state) => state.player?.id);
  if (playerId === undefined)
    throw new Error("⛔ TownHallOnMap: playerId is undefined!");

  // Zustand GameVarsStore
  const townhallLevel = useGameVarsStore((state) => state.townhallLevel);

  if (images === undefined)
    throw new Error("⛔ TownHallOnMap, images is undefined!");

  const handleOpenTownHallModal = useCallback(() => {
    console.log("You Clicked On The TownHall!");
    pushModal(
      <StandardModal
        bgImage={images.modal_backgrounds.townHallBG}
        contentScreens={[
          <TownHallModalMainScreen />,
          <TownHallManageScreen />,
          <DefaultBuildingsLvlUpScreen type="townhall" />,
          // <TownHallResourcesScreen />, // Its the same as MainScreen, but instead of Showing the "Gath Rates" it shows the "Resources"
        ]}
        contentType="townhall"
        label="Town Hall"
        level={townhallLevel}
        onClose={() => {
          console.log("TownHall Modal Clossing...");
          const currentWorkers = useGameVarsStore.getState().allWorkers;
          const shouldUpdateDB = compareWorkers(prevWorkers, currentWorkers);

          if (shouldUpdateDB) {
            console.log("Updating Workers in DB!");
            updatePlayerData(playerId, {
              workers_concrete: currentWorkers.concreteWorkers,
              workers_diesel: currentWorkers.dieselWorkers,
              workers_crystals: currentWorkers.crystalsWorkers,
              workers_metals: currentWorkers.metalsWorkers,
            });
          }
        }}
      />
    );
  }, [
    images.modal_backgrounds.townHallBG,
    playerId,
    prevWorkers,
    pushModal,
    townhallLevel,
  ]);

  return (
    <div
      className="defaultBuildingTownHall"
      onClick={() => {
        setSelectedMapEntity(0o1);
        handleOpenTownHallModal();
      }}
    >
      <GlowImage
        src={images?.onMapAssets.townHallOnMapAsset}
        alt="TownHall OnMap"
        isHovered={highlightedImg === 0o1}
        onHover={() => handleHover(0o1)}
        onLeave={() => handleLeave(0o1)}
      />
    </div>
  );
};

export default TownHallOnMap;
