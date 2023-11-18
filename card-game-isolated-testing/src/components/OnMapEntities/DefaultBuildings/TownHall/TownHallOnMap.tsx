import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { UseGlobalContext } from "../../../../context/GlobalContext/GlobalContext";
import { useGameVarsStore } from "../../../../stores/gameVars";
import { useModalStore } from "../../../../stores/modalStore";
import { Level } from "../../../../types";
import { ActionsSectionAction } from "../../../../types/ModalTypes/ActionsSectionTypes";
import { isLevel } from "../../../../types/TypeGuardFns/LevelTypeGuard";
import GlowImage from "../../../GlowImage/GlowImage";
import StandardModal from "../../../Modals/StandardModal/StandardModal";
import "../defaultBuildings.css";
import TownHallModalLayout from "./TownHallModalLayout/TownHallModalLayout";

interface Props {
  highlightedImg: number | null;
  handleHover: (id: number) => void;
  handleLeave: (id: number) => void;
  setSelectedMapEntity: Dispatch<SetStateAction<number | null>>;
}

const incrementByOne = (currentTHLevel: Level) => {
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
};

const TownHallOnMap = ({
  highlightedImg,
  handleHover,
  handleLeave,
  setSelectedMapEntity,
}: Props) => {
  const { images } = UseGlobalContext();

  // TownHall Modal - Menus State
  const [isMainMenu, setIsMainMenu] = useState<boolean>(true);

  // Zustand ModalStore
  const pushModal = useModalStore((state) => state.pushModal);
  const popModal = useModalStore((state) => state.popModal);
  const provideModalData = useModalStore((state) => state.provideModalData);
  const modalBg = useModalStore((state) => state.modalData.modalBg);
  const modalId = useModalStore((state) => state.modalData.id);

  // Zustand GameVarsStore
  const townhallLevel = useGameVarsStore((state) => state.townhallLevel);
  const setHappiness = useGameVarsStore((state) => state.setHappiness);
  const setTownhallLevel = useGameVarsStore((state) => state.setTownhallLevel);

  if (images === undefined)
    throw new Error("⛔ TownHallOnMap, images is undefined!");

  const levelUpTownhall = () => {
    if (townhallLevel === 5) setTownhallLevel(1);

    const newValue = townhallLevel + 1;
    if (isLevel(newValue)) {
      setTownhallLevel(incrementByOne);
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
    console.log("🤞 notImplementedYet!");

    setIsMainMenu((prev) => {
      console.log("💎 aosjdhn9asiuhd9auhdas9iu!");
      console.log("💎 prev: ", prev);

      if (prev === true) {
        popModal();
        provideModalData({
          id: null,
          modalBg: images?.modal_backgrounds.townHallBG,
          modalLevel: null,
          modalRarityOrName: null,
          modalType: "standard",
        });
      } else {
        popModal();
        provideModalData({
          id: 0o1,
          modalBg: images?.modal_backgrounds.townHallBG,
          modalLevel: townhallLevel,
          modalRarityOrName: "Townhall",
          modalType: "standard",
        });
      }
      return !prev;
    });
  };
  // setIsMainMenu(false);

  // provideModalData({ modalBg: null });

  // pushModal(
  //   <ConfirmationModal
  //     message="Coming Soon! 😁"
  //     onConfirm={() => {
  //       console.log("This Was Pressed: Confirm");
  //     }}
  //     onCancel={() => {
  //       console.log("This Was Pressed: Cancel");
  //     }}
  //   />,
  //   "confirmation"
  // );

  const townhallActions: ActionsSectionAction[] = [
    { text: "Level Up", handler: levelUpTownhall },
    { text: "Manage Workers", handler: notImplementedYet },
    { text: "Change Happiness", handler: changeHappiness },
  ];

  // useEffect(() => {
  //   console.log("PARENT RE-RENDERED");
  //   console.log(isMainMenu);
  //   pushModal(
  //     <StandardModal
  //       actions={townhallActions}
  //       onConfirm={() => {
  //         popModal();
  //       }}
  //       onCancel={() => {
  //         popModal();
  //       }}
  //     >
  //       <TownHallModalLayout
  //         isMainMenu={isMainMenu}
  //         // setIsMainMenu={setIsMainMenu}
  //       />
  //     </StandardModal>,
  //     "standard"
  //   );
  //   // forceRender();
  // }, [isMainMenu]);

  // This Renders the StandardModal
  // const handleOpenTownHallModal = useCallback(() => {
  //   provideModalData(
  //     {
  //       modalBg: images?.modal_backgrounds.townHallBG,
  //     },
  //     () => {
  //       pushModal(
  //         <StandardModal
  //           actions={townhallActions}
  //           onConfirm={() => {
  //             popModal();
  //           }}
  //           level={townhallLevel}
  //           rarityOrName={"Townhall"}
  //           onCancel={() => {
  //             popModal();
  //           }}
  //         >
  //           <TownHallModalLayout isMainMenu={isMainMenu} />
  //         </StandardModal>,
  //         "standard"
  //       );
  //     }
  //   );
  // }, []);

  const handleOpenTownHallModal = useCallback(() => {
    provideModalData({
      id: 0o1,
      modalBg: images?.modal_backgrounds.townHallBG,
      modalLevel: townhallLevel,
      modalRarityOrName: "Townhall",
      modalType: "standard",
    });
  }, [isMainMenu, images, townhallActions]);

  useEffect(() => {
    console.log("UseEffect For [TH MainMenu], ID: ", modalId);
    if (modalId !== 0o1) return;
    console.log("SSSSSSSSSSSSSSSSSS");
    pushModal(
      <StandardModal
        actions={townhallActions}
        onConfirm={() => {
          popModal();
        }}
        level={townhallLevel}
        rarityOrName={"Townhall"}
        onCancel={() => {
          popModal();
        }}
      >
        <TownHallModalLayout isMainMenu={isMainMenu} />
      </StandardModal>
    );

    // return () => {
    //   second
    // }
  }, [modalId]);

  useEffect(() => {
    console.log("UseEffect #1: ", isMainMenu);
    console.log("UseEffect #2: ", modalId !== 0o1);
    if (isMainMenu || modalId === 0o1) return;
    console.log(":AAAA:::::::");
    console.log(isMainMenu);
    console.log(modalId);
    pushModal(
      <StandardModal
        actions={townhallActions}
        onConfirm={() => {
          popModal();
        }}
        level={townhallLevel}
        rarityOrName={"Townhall"}
        onCancel={() => {
          popModal();
        }}
      >
        <TownHallModalLayout isMainMenu={isMainMenu} />
      </StandardModal>
    );

    // return () => {
    //   second
    // }
  }, [isMainMenu, modalId]);

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
