import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
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
  // const [isMainMenu, setIsMainMenu] = useState<boolean>(true);

  // Zustand ModalStore
  const pushModal = useModalStore((state) => state.pushModal);
  const popModal = useModalStore((state) => state.popModal);
  const provideModalData = useModalStore((state) => state.provideModalData);
  // const clearModalData = useModalStore((state) => state.clearModalData);
  // const modalBg = useModalStore((state) => state.modalData.modalBg);
  const modalId = useModalStore((state) => state.modalData.id);
  const modalMenuIndex = useModalStore(
    (state) => state.modalData.modalMenuIndex
  );

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

  const notImplementedYet_ManageWorkers = () => {
    console.log("🤞 notImplementedYet_ManageWorkers!");

    // setIsMainMenu((prev) => {
    // console.log("💎 aosjdhn9asiuhd9auhdas9iu!");
    // console.log("💎 prev: ", prev);
    if (modalMenuIndex === 0) {
      // If it is on the Main Menu...
      popModal();
      provideModalData({
        id: 1,
        modalBg: images?.modal_backgrounds.townHallBG,
        modalMenuIndex: 1,
      });
      // By changing the Zustand Store State, the useEffect will be triggered
      // and create a new modal
    } else if (modalMenuIndex === 1) {
      // This is the ManageWorkers Menu
      popModal();
      provideModalData({
        id: 1,
        modalBg: images?.modal_backgrounds.townHallBG,
        modalMenuIndex: 0,
      });
    } else {
      throw new Error("⛔ notImplementedYet_ManageWorkers!!!");
    }

    // if (prev === true) {
    //   provideModalData({
    //     id: null,
    //     modalBg: images?.modal_backgrounds.townHallBG,
    //     modalLevel: null,
    //     modalRarityOrName: null,
    //     modalMenuIndex: 1,
    //     modalType: "standard",
    //   });
    // } else {
    //   popModal();
    //   provideModalData({
    //     id: 0o1,
    //     modalBg: images?.modal_backgrounds.townHallBG,
    //     modalLevel: townhallLevel,
    //     modalRarityOrName: "Townhall",
    //     modalType: "standard",
    //     modalMenuIndex: 0,
    //   });
    // }
    // return !prev;
    // });
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
    { text: "Manage Workers", handler: notImplementedYet_ManageWorkers },
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
    console.log("You Clicked On The TownHall!");
    provideModalData({
      id: 0o1,
      modalBg: images?.modal_backgrounds.townHallBG,
      modalLevel: townhallLevel,
      modalRarityOrName: "Townhall",
      modalType: "standard",
      modalMenuIndex: 0,
    });
  }, [images, townhallActions]);

  useEffect(() => {
    console.log("1st UseEffect");
    console.log("UseEffect For [TH MainMenu], ID: ", modalId);
    console.log("1st UseEffect: modalMenuIndex: ", modalMenuIndex);
    if (modalId !== 0o1 || modalMenuIndex !== 0) return;
    console.log("1st UseEffect, was Executed!");

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
        <TownHallModalLayout />
      </StandardModal>
    );

    // return () => {
    //   second
    // }
  }, [modalId, modalMenuIndex]);

  useEffect(() => {
    console.log("2nd UseEffect");
    console.log("modalId: ", modalId);
    console.log("2nd UseEffect: modalMenuIndex: ", modalMenuIndex);
    if (modalMenuIndex !== 1) return;
    console.log("2nd UseEffect, was Executed!");
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
        <TownHallModalLayout />
      </StandardModal>
    );

    // return () => {
    //   second
    // }
  }, [modalId, modalMenuIndex]);

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
