import { Dispatch, SetStateAction, useCallback } from "react";
import { UseGlobalContext } from "../../../../context/GlobalContext/GlobalContext";
import { useModalStore } from "../../../../stores/modalStore";
import GlowImage from "../../../GlowImage/GlowImage";
import StandardModal from "../../../Modals/StandardModal/StandardModal";
import "../defaultBuildings.css";

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

  // This Renders the StandardModal
  const handleOpenFactoryModal = useCallback(() => {
    pushModal(
      <StandardModal
        message="This is Town Hall [TOWN HALL - Modal]"
        onConfirm={() => {
          popModal();
        }}
        onCancel={() => {
          popModal();
        }}
      />
    );
  }, []);

  if (images === undefined)
    throw new Error("⛔ TownHallOnMap, images is undefined!");

  return (
    <div
      className="defaultBuildingTownHall"
      onClick={() => {
        setSelectedMapEntity(0o1);
        handleOpenFactoryModal();
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
