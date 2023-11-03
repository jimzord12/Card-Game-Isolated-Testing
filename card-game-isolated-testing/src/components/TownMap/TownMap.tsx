import { useCallback, useState } from "react";

// CSS Modules
import styles from "./css/general.module.css";

// import { buildings } from "../../assets/imgs/onMapAssets";
// import {
//   multipleTree,
//   singleTree,
//   withShadow,
// } from "../../assets/imgs/onMapAssets/bushesAndTrees";
import GlowOutlineFilter from "../GlowOutlineFilter";
import TreesOnMap from "../OnMapEntities/Trees/TreesOnMap";
import BuildingsOnMap from "../OnMapEntities/Buildings/BuildingsOnMap";

interface propsTypes {
  mapImagePath: string;
}

const TownMap = ({ mapImagePath }: propsTypes) => {
  const [highlightedImg, setHighlightedImg] = useState<number | null>(null);

  const handleHover = useCallback((id: number) => {
    setHighlightedImg(id);
  }, []); // Dependencies array is empty because it does not depend on any external values

  const handleLeave = useCallback((id: number) => {
    console.log(id);
    setHighlightedImg(null);
  }, []); // Dependencies array is empty for the same reason

  return (
    <>
      <div className={styles.imageContainer}>
        <img
          src={mapImagePath}
          alt="Background - TownMap"
          className={styles.backgroundImage}
        />

        <GlowOutlineFilter />
        <BuildingsOnMap
          highlightedImg={highlightedImg}
          handleHover={handleHover}
          handleLeave={handleLeave}
        />

        <TreesOnMap />
      </div>
    </>
  );
};

export default TownMap;
