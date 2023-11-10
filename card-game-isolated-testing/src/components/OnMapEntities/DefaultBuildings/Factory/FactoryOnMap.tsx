import { Dispatch, SetStateAction } from "react";
import GlowImage from "../../../GlowImage/GlowImage";
import { UseGlobalContext } from "../../../../context/GlobalContext/GlobalContext";

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

  if (images === undefined)
    throw new Error("⛔ TownHallOnMap, images is undefined!");

  return (
    <div
      className="defaultBuildingFactory"      
      onClick={() => setSelectedMapEntity(0o2)}
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
