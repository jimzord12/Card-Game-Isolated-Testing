// React Imports
import { useCallback, useEffect, useState } from "react";

// CSS Modules
import styles from "./css/general.module.css";

// Image Context
import { UseGlobalContext } from "../../context/GlobalContext/GlobalContext";

// Zustang Stores
import { useTownMapStore } from "../../stores/townMapEntitiesStore";

// Types

// Classes
import BuildingCard from "../../classes/buildingClass_V2";
import RegCard from "../../classes/regClass_V2";

// Components
import { useGameVarsStore } from "../../stores/gameVars";
import GlowOutlineFilter from "../GlowOutlineFilter";
import EntityTemplateGroup from "../OnMapEntities/EntityTemplateGroup/EntityTemplateGroup";
import Placeholders from "../OnMapEntities/Placeholders/Placeholders";
import TreesOnMap from "../OnMapEntities/Trees/TreesOnMap";

// Modals

const TownMap = () => {
  const { images /*, clearCache */ } = UseGlobalContext();
  const [highlightedImg, setHighlightedImg] = useState<number | null>(null);
  const [selectedMapEntity, setSelectedMapEntity] = useState<number | null>(
    null
  );
  // Zustang Store Related
  const mapEntities = useTownMapStore((state) => state.mapEntities);
  const addEntityOnMap = useTownMapStore((state) => state.addEntity);
  const townHallLevel = useGameVarsStore((state) => state.townhallLevel);

  if (images?.maps === undefined || images?.onMapAssets === undefined)
    throw new Error("⛔ TownMap: images are undefined!");

  // 🧪 For Testing
  useEffect(() => {
    const testCardREG = RegCard.createNew(
      2,
      2,
      "ssss",
      "SimpleSolarPanel",
      11,
      true
    );

    const testCardBuilding = BuildingCard.createNew(
      1, // Card's Unique ID
      1, // Player/Owner ID
      "Player_02", // Player Name
      "AmusementPark", // Card's Name, is Typed
      4, // Spot on Map, is Typed
      true // Card's Initial State
    );
    addEntityOnMap(testCardREG);
    addEntityOnMap(testCardBuilding);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedMapEntity === null) return;
    console.log("The Selected Image is this: ", selectedMapEntity);
  }, [selectedMapEntity]);

  const handleHover = useCallback((id: number) => {
    setHighlightedImg(id);
  }, []);

  const handleLeave = useCallback(() => {
    setHighlightedImg(null);
  }, []);

  // const FAKE_PLAYER_INFO: {
  //   townHallLevel: CardLevel;
  //   [key: string]: any;
  // } = { townHallLevel: townHallLevel };

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
          <Placeholders
            setSelectedMapEntity={setSelectedMapEntity}
            handleHover={handleHover}
            handleLeave={handleLeave}
            highlightedImg={highlightedImg}
            townhallLevel={townHallLevel}
            mapEntities={mapEntities}
          />

          {/* TODO: Make a an string Array ["building", "reg", "default"]
          and loop through it, to DRY the code */}

          {/* >>> BUILDINGS <<< */}
          <EntityTemplateGroup
            setSelectedMapEntity={setSelectedMapEntity}
            handleHover={handleHover}
            handleLeave={handleLeave}
            highlightedImg={highlightedImg}
            mapEntities={mapEntities}
            entityType="building"
          />

          {/* >>> REGS <<< */}
          <EntityTemplateGroup
            setSelectedMapEntity={setSelectedMapEntity}
            handleHover={handleHover}
            handleLeave={handleLeave}
            highlightedImg={highlightedImg}
            mapEntities={mapEntities}
            entityType="reg"
          />

          {/* >>> DEFAULT BUILDINGS <<< */}
          <EntityTemplateGroup
            setSelectedMapEntity={setSelectedMapEntity}
            handleHover={handleHover}
            handleLeave={handleLeave}
            highlightedImg={highlightedImg}
            mapEntities={mapEntities}
            entityType="default"
          />

          {/* >>> TREES & BUSHES <<< */}
          <TreesOnMap images={images} />
        </>
      </div>
    </>
  );
};

export default TownMap;
