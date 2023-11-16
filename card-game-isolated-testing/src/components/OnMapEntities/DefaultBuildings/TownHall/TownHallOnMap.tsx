import { Dispatch, SetStateAction, useCallback } from "react";
import { UseGlobalContext } from "../../../../context/GlobalContext/GlobalContext";
import { useGameVarsStore } from "../../../../stores/gameVars";
import { useModalStore } from "../../../../stores/modalStore";
import { Level } from "../../../../types";
import { ActionsSectionAction } from "../../../../types/ModalTypes/ActionsSectionTypes";
import { isLevel } from "../../../../types/TypeGuardFns/LevelTypeGuard";
import GlowImage from "../../../GlowImage/GlowImage";
import ConfirmationModal from "../../../Modals/ConfirmationModal/ConfirmationModal";
import StandardModal from "../../../Modals/StandardModal/StandardModal";
import "../defaultBuildings.css";
import TownHallModalLayout from "./TownHallModalLayout/TownHallModalLayout";

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

  const pushModal = useModalStore((state) => state.pushModal);
  const popModal = useModalStore((state) => state.popModal);
  const provideModalData = useModalStore((state) => state.provideModalData);

  const townhallLevel = useGameVarsStore((state) => state.townhallLevel);
  // const happiness = useGameVarsStore((state) => state.happiness);
  // const totalPop = useGameVarsStore((state) => state.totalPop);

  // const setTotalPop = useGameVarsStore((state) => state.setTotalPop);
  const setHappiness = useGameVarsStore((state) => state.setHappiness);
  const setTownhallLevel = useGameVarsStore((state) => state.setTownhallLevel);

  if (images === undefined)
    throw new Error("⛔ TownHallOnMap, images is undefined!");

  const levelUpTownhall = () => {
    if (townhallLevel === 5) setTownhallLevel(1);

    const newValue = townhallLevel + 1;
    if (isLevel(newValue)) {
      setTownhallLevel((currentTHLevel: Level) => {
        if (currentTHLevel === 5) {
          console.log("🤞 Townhall got Updated!");
          return 1;
        } else {
          // Otherwise, increment the level
          const newValue = currentTHLevel + 1;
          if (isLevel(newValue)) {
            console.log("🤞 Townhall got Updated!");
            return newValue;
          }
          return currentTHLevel; // Return the current level if newValue is not valid
        }
      });
    }
  };

  const changeHappiness = () => {
    setHappiness((currentHappiness: number) => {
      // Determine the new happiness value based on the currentHappiness
      const newHappiness = currentHappiness >= 200 ? 25 : currentHappiness + 50;

      // Log the new value
      console.log("🤞 New Happiness: ", newHappiness);

      // Return the new happiness value to update the state
      return newHappiness;
    });

    // Log that happiness was requested to be updated
    console.log("🤞 Happiness got Updated!");
  };

  const notImplementedYet = () => {
    pushModal(
      <ConfirmationModal
        message="Coming Soon! 😁"
        onConfirm={() => {
          console.log("This Was Pressed: Confirm");
        }}
        onCancel={() => {
          console.log("This Was Pressed: Cancel");
        }}
      />,
      "confirmation"
    );
  };

  const townhallActions: ActionsSectionAction[] = [
    { text: "Level Up", handler: levelUpTownhall },
    { text: "Manage Workers", handler: notImplementedYet },
    { text: "Change Happiness", handler: changeHappiness },
  ];

  // This Renders the StandardModal
  const handleOpenTownHallModal = useCallback(() => {
    provideModalData({
      modalBg: images?.modal_backgrounds.townHallBG,
    });
    pushModal(
      <StandardModal
        actions={townhallActions}
        confirmationMsg="Are you sure you want to lvl up?"
        onConfirm={() => {
          popModal();
        }}
        onCancel={() => {
          popModal();
        }}
      >
        <TownHallModalLayout />
      </StandardModal>,
      "standard"
    );
  }, []);

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
