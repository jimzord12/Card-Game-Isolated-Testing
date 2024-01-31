// React Imports
import { useCallback, useEffect, useState } from "react";

// CSS Modules
import styles from "./css/general.module.css";

// Image Context
import { UseGlobalContext } from "../../../context/GlobalContext/GlobalContext";

// Zustang Stores
import { useTownMapStore } from "../../../stores/townMapEntitiesStore";
import { useGameVarsStore } from "../../../stores/gameVars";

// Types

// Classes

// Components
import GlowOutlineFilter from "../../../components/GlowOutlineFilter";
import EntityTemplateGroup from "../../../components/OnMapEntities/EntityTemplateGroup/EntityTemplateGroup";
import Placeholders from "../../../components/OnMapEntities/Placeholders/Placeholders";
import TreesOnMap from "../../../components/OnMapEntities/Trees/TreesOnMap";

// Modals

const TownMap = () => {
  const { images /*, clearCache */ } = UseGlobalContext();
  const [highlightedImg, setHighlightedImg] = useState<number | null>(null);
  const [selectedMapEntity, setSelectedMapEntity] = useState<number | null>(
    null
  );
  // Zustang Store Related
  const mapEntities = useTownMapStore((state) => state.mapEntities);
  // const addEntityOnMap = useTownMapStore((state) => state.addEntity);
  const townHallLevel = useGameVarsStore((state) => state.townhallLevel);

  if (images?.maps === undefined || images?.onMapAssets === undefined)
    throw new Error("⛔ TownMap: images are undefined!");

  const OnMapEntitiesTypes = ["building", "reg", "default"] as const;

  useEffect(() => {
    if (selectedMapEntity === null) return;
    // console.log("The Selected Image is this: ", selectedMapEntity);
  }, [selectedMapEntity]);

  const handleHover = useCallback((id: number) => {
    setHighlightedImg(id);
  }, []);

  const handleLeave = useCallback(() => {
    setHighlightedImg(null);
  }, []);

  const templateGrpProps = {
    setSelectedMapEntity,
    handleHover,
    handleLeave,
    highlightedImg,
    mapEntities,
  };

  /**
   * @futureImprovement_1 Rather than providing all mapEntities to each EntityTemplateGroup. filter them and provide only the ones that are needed.
   * @futureImprovement_2 Create 3 EntityTemplateGroups, one for each type of Entity (Building, Reg, Default). This will make the code more readable and easier to follow.
   */
  return (
    <>
      <div className={styles.imageContainer}>
        <img
          src={images.maps.townMap}
          alt="Background - TownMap"
          className={styles.backgroundImage}
        />

        <>
          <GlowOutlineFilter />
          {/* >>> PLACEHOLDERS <<< */}
          <Placeholders {...templateGrpProps} townhallLevel={townHallLevel} />

          {OnMapEntitiesTypes.map((entityType) => (
            <EntityTemplateGroup
              {...templateGrpProps}
              entityType={entityType}
            />
          ))}

          {/* >>> BUILDINGS <<< */}
          {/* <EntityTemplateGroup {...templateGrpProps} entityType="building" /> */}

          {/* >>> REGS <<< */}
          {/* <EntityTemplateGroup {...templateGrpProps} entityType="reg" /> */}

          {/* >>> DEFAULT BUILDINGS <<< */}
          {/* <EntityTemplateGroup {...templateGrpProps} entityType="default" /> */}

          {/* >>> TREES & BUSHES <<< */}
          <TreesOnMap images={images} />
        </>
      </div>
    </>
  );
};

export default TownMap;
