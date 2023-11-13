import { Dispatch, SetStateAction, useCallback } from "react";
import { UseGlobalContext } from "../../../../context/GlobalContext/GlobalContext";
import GlowImage from "../../../GlowImage/GlowImage";

import { useModalStore } from "../../../../stores/modalStore";
import StandardModal from "../../../Modals/StandardModal/StandardModal";
import "../defaultBuildings.css";

interface Props {
  highlightedImg: number | null;
  handleHover: (id: number) => void;
  handleLeave: (id: number) => void;
  setSelectedMapEntity: Dispatch<SetStateAction<number | null>>;
}

const FactoryOnMap = ({
  highlightedImg,
  handleHover,
  handleLeave,
  setSelectedMapEntity,
}: Props) => {
  const { images } = UseGlobalContext();

  const pushModal = useModalStore((state) => state.pushModal);
  const popModal = useModalStore((state) => state.popModal);

  // This Renders the StandardModal
  const handleOpenTownHallModal = useCallback(() => {
    pushModal(
      <StandardModal
        message="This is Diesel Factory [DIESEL FACTORY - Modal]"
        // "onConfirm" is passed to Confirmation Modal
        onConfirm={() => {
          popModal();
        }}
        // "onCancel" is passed to Confirmation Modal
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
      className="defaultBuildingFactory"
      onClick={() => {
        setSelectedMapEntity(0o2);
        handleOpenTownHallModal();
      }}
    >
      <GlowImage
        src={images.onMapAssets.dieselFactoryOnMapAsset}
        alt="Factory - On Map"
        isHovered={highlightedImg === 0o2}
        onHover={() => handleHover(0o2)}
        onLeave={() => handleLeave(0o2)}
      />
    </div>
  );
};

export default FactoryOnMap;
