import { Dispatch, SetStateAction, useCallback } from "react";
import { UseGlobalContext } from "../../../../context/GlobalContext/GlobalContext";
import GlowImage from "../../../GlowImage/GlowImage";

import "../defaultBuildings.css";
import StandardModal from "../../../Modals/StandardModal/StandardModal";
import { useModalStore } from "../../../../stores/modalStore";
import { useGameVarsStore } from "../../../../stores/gameVars";

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

  if (images === undefined)
    throw new Error("⛔ FactoryOnMap, images is undefined!");

  const pushModal = useModalStore((state) => state.pushModal);
  const factoryLevel = useGameVarsStore((state) => state.factoryLevel);

  // This Renders the StandardModal
  const handleOpenFactoryModal = useCallback(() => {
    // console.log("You Clicked On The Factory!");
    pushModal(
      <StandardModal
        bgImage={images.modal_backgrounds.dieselFactoryBG}
        contentScreens={[
          <div style={{ fontSize: 42, color: "white" }}>
            The Main Screen!!!
          </div>,
          <div style={{ fontSize: 42, color: "white" }}>Level Up Screen!!</div>,
        ]}
        contentType="factory"
        label="Diesel Factory"
        level={factoryLevel}
      />
    );
  }, []);

  return (
    <div
      className="defaultBuildingFactory"
      onClick={() => {
        setSelectedMapEntity(0o2);
        handleOpenFactoryModal();
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
