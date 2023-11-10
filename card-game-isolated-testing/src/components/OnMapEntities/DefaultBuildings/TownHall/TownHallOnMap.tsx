import { Dispatch, SetStateAction } from "react";
import { UseGlobalContext } from "../../../../context/GlobalContext/GlobalContext";
import GlowImage from "../../../GlowImage/GlowImage";
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

  if (images === undefined)
    throw new Error("⛔ TownHallOnMap, images is undefined!");

  return (
    <div
      className="defaultBuildingTownHall"
      onClick={() => setSelectedMapEntity(0o1)}
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
