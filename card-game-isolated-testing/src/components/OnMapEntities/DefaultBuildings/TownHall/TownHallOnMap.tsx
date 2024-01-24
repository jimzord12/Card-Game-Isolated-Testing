import { Dispatch, SetStateAction, useCallback } from "react";
import { UseGlobalContext } from "../../../../context/GlobalContext/GlobalContext";
import { useGameVarsStore } from "../../../../stores/gameVars";
import { useModalStore } from "../../../../stores/modalStore";
// import { Level } from "../../../../types";
// import { ActionsSectionAction } from "../../../../types/ModalTypes/ActionsSectionTypes";
// import { isLevel } from "../../../../types/TypeGuardFns/LevelTypeGuard";
import GlowImage from "../../../GlowImage/GlowImage";
import StandardModal from "../../../Modals/StandardModal/StandardModal";
import "../defaultBuildings.css";
import TownHallModalMainScreen from "./TownHallModalLayout/Screens/TownHallModalMainScreen";

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

  // TownHall Modal - Menus State
  // const [isMainMenu, setIsMainMenu] = useState<boolean>(true);

  // Zustand ModalStore
  const pushModal = useModalStore((state) => state.pushModal);

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
          <div style={{ fontSize: 42, color: "white" }}>Workers Screen!!!</div>,
          <div style={{ fontSize: 42, color: "white" }}>Level Up Screen!!</div>,
        ]}
        contentType="townhall"
        label="Town Hall"
        level={townhallLevel}
      />
    );
  }, [images.modal_backgrounds.townHallBG, pushModal, townhallLevel]);

  // useEffect(() => {
  //   console.log("1st UseEffect");
  //   console.log("UseEffect For [TH MainMenu], ID: ", modalId);
  //   console.log("1st UseEffect: modalMenuIndex: ", modalMenuIndex);
  //   if (modalId !== 0o1 || modalMenuIndex !== 0) return;
  //   console.log("1st UseEffect, was Executed!");

  //   pushModal(
  //     <StandardModal
  //       actions={townhallActions}
  //       // onConfirm={() => {
  //       //   popModal();
  //       // }}
  //       // level={townhallLevel}
  //       rarityOrName={"Townhall"}
  //       // onCancel={() => {
  //       //   popModal();
  //       // }}
  //     >
  //       <TownHallModalLayout />
  //     </StandardModal>
  //   );

  //   // return () => {
  //   //   second
  //   // }
  // }, [modalId, modalMenuIndex]);

  // useEffect(() => {
  //   console.log("2nd UseEffect");
  //   console.log("modalId: ", modalId);
  //   console.log("2nd UseEffect: modalMenuIndex: ", modalMenuIndex);
  //   if (modalMenuIndex !== 1) return;
  //   console.log("2nd UseEffect, was Executed!");
  //   pushModal(
  //     <StandardModal
  //       actions={townhallActions}
  //       // onConfirm={() => {
  //       //   popModal();
  //       // }}
  //       level={townhallLevel}
  //       rarityOrName={"Townhall"}
  //       // onCancel={() => {
  //       //   popModal();
  //       // }}
  //     >
  //       <TownHallModalLayout />
  //     </StandardModal>
  //   );

  //   // return () => {
  //   //   second
  //   // }
  // }, [modalId, modalMenuIndex]);

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
