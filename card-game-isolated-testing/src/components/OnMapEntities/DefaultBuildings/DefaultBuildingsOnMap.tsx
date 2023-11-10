import { Dispatch, SetStateAction } from "react";
import FactoryOnMap from "./Factory/FactoryOnMap";
import TownHallOnMap from "./TownHall/TownHallOnMap";
import "./defaultBuildings.css";

interface Props {
  highlightedImg: number | null;
  handleHover: (id: number) => void;
  handleLeave: (id: number) => void;
  setSelectedMapEntity: Dispatch<SetStateAction<number | null>>;
}

const DefaultBuildingsOnMap = ({
  highlightedImg,
  handleHover,
  handleLeave,
  setSelectedMapEntity,
}: Props) => {
  return (
    <div>
      <FactoryOnMap
        highlightedImg={highlightedImg}
        handleHover={handleHover}
        handleLeave={handleLeave}
        setSelectedMapEntity={setSelectedMapEntity}
      />
      <TownHallOnMap
        highlightedImg={highlightedImg}
        handleHover={handleHover}
        handleLeave={handleLeave}
        setSelectedMapEntity={setSelectedMapEntity}
      />
    </div>
  );
};

export default DefaultBuildingsOnMap;
