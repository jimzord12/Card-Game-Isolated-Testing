import { Dispatch, SetStateAction, useCallback } from "react";
import { UseGlobalContext } from "../../../../context/GlobalContext/GlobalContext";
import { useModalStore } from "../../../../stores/modalStore";
import { ActionsSectionAction } from "../../../../types/ModalTypes/ActionsSectionTypes";
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

const doStaff = () => {
  console.log("do staff");
};
const doOtherStaff = () => {
  console.log("doOtherStaff");
};

const townhallActions: ActionsSectionAction[] = [
  { text: "Level Up", handler: doStaff },
  { text: "Manage Workers", handler: doOtherStaff },
];

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

  if (images === undefined)
    throw new Error("⛔ TownHallOnMap, images is undefined!");

  // This Renders the StandardModal
  const handleOpenTownHallModal = useCallback(() => {
    provideModalData({ modalBg: images?.modal_backgrounds.townHallBG });
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
      </StandardModal>
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
