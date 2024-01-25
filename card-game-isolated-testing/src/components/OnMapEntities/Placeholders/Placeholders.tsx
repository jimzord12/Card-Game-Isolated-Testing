import { Dispatch, SetStateAction, useMemo } from "react";
import PlaceholderBuilding from "./Buildings/B_placeholder";
import PlaceholderREG from "./REGs/R_placeholder";

import { UseGlobalContext } from "../../../context/GlobalContext/GlobalContext";
import { placeholderInfo } from "../../../data/test/placeholderInfo";
import {
  BuildingSpot,
  Level,
  RegSpot,
  TownMapEntitiesData,
} from "../../../types";

interface props {
  townhallLevel: Level;
  mapEntities: TownMapEntitiesData;
  highlightedImg: number | null;
  handleHover: (id: number) => void;
  handleLeave: (id: number) => void;
  setSelectedMapEntity: Dispatch<SetStateAction<number | null>>;
}

const Placeholders = ({
  townhallLevel,
  mapEntities,
  highlightedImg,
  handleHover,
  handleLeave,
  setSelectedMapEntity,
}: props) => {
  const { images } = UseGlobalContext();
  if (images === undefined)
    throw new Error("⛔ Placeholders, images are undefined!");

  const filteredImgs = useMemo(
    () => ({
      building: {
        placeholder: images.onMapAssets.buildingPlaceholderOnMapAsset,
        padlock: images.onMapAssets.buildingPadLockOnMapAsset,
      },
      reg: {
        placeholder: images.onMapAssets.REGPlaceholderOnMapAsset,
        padlock: images.onMapAssets.REGPadlockOnMapAsset,
      },
    }),
    [images]
  );

  return (
    <div>
      {placeholderInfo.map((placeholder) => {
        if (placeholder.subType === "building") {
          return (
            <PlaceholderBuilding
              key={placeholder.id}
              id={placeholder.id}
              isLocked={
                placeholder.id === 402
                  ? true
                  : townhallLevel < placeholder.unlocksAt
              }
              spot={placeholder.spot as BuildingSpot}
              highlightedImg={highlightedImg}
              handleHover={handleHover}
              handleLeave={handleLeave}
              setSelectedMapEntity={setSelectedMapEntity}
              mapEntities={mapEntities}
              imgUrls={filteredImgs.building}
            />
          );
        } else if (placeholder.subType === "reg") {
          return (
            <PlaceholderREG
              key={placeholder.id}
              id={placeholder.id}
              isLocked={townhallLevel < placeholder.unlocksAt}
              spot={placeholder.spot as RegSpot}
              highlightedImg={highlightedImg}
              handleHover={handleHover}
              handleLeave={handleLeave}
              setSelectedMapEntity={setSelectedMapEntity}
              mapEntities={mapEntities}
              imgUrls={filteredImgs.reg}
            />
          );
        } else {
          throw new Error("⛔ Problem Origin: Placeholders.tsx");
        }
      })}
    </div>
  );
};

export default Placeholders;
