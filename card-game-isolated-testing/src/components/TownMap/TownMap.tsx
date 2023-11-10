// import { useCallback, useEffect, useState } from "react";

// CSS Modules
import styles from "./css/general.module.css";

// Zustand Stores

// Components

// import { testingPlaceholderImgs } from "../../data/test/placeholderImgs";
import { useCallback, useEffect, useMemo, useState } from "react";
import BuildingCard from "../../classes/buildingClass";
import RegCard from "../../classes/regClass";
import { UseGlobalContext } from "../../context/GlobalContext/GlobalContext";
import { useTownMapStore } from "../../store/townMapEntitiesStore";
import { CardLevel } from "../../types";
import GlowOutlineFilter from "../GlowOutlineFilter";
import EntityTemplateGroup from "../OnMapEntities/EntityTemplateGroup/EntityTemplateGroup";
import Placeholders from "../OnMapEntities/Placeholders/Placeholders";
import TreesOnMap from "../OnMapEntities/Trees/TreesOnMap";
useTownMapStore;

const TownMap = () => {
  const { images /* clearCache */ } = UseGlobalContext();
  const [highlightedImg, setHighlightedImg] = useState<number | null>(null);
  const [selectedMapEntity, setSelectedMapEntity] = useState<number | null>(
    null
  );
  const mapEntities = useTownMapStore((state) => state.mapEntities);
  const addEntityOnMap = useTownMapStore((state) => state.addEntity);

  if (images?.maps === undefined || images?.onMapAssets === undefined)
    throw new Error("⛔ TownMap: images are undefined!");
  // throw new Error("ssss");

  useMemo(() => {
    console.log("👉 THE IMAGES: ", images);
    console.log("👉 IMAGES -> Cards: ", images.cards);
    console.log("👉 IMAGES -> Cards -> Hospital: ", images.cards.hospitalCard);
  }, [images]);

  // 🧪 For Testing
  useEffect(() => {
    console.log("⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔");
    console.log("⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔");
    console.log("⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔");
    console.log("⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔");
    const testCardREG = RegCard.createNew(
      2,
      2,
      "ssss",
      "src/assets/imgs_new_convention/cards/cards-simpleWindTurbineCard.webp",
      204,
      11,
      true
    );
    const testCardBuilding = BuildingCard.createNew(
      1,
      1,
      "skata",
      "src/assets/imgs_new_convention/onMapAssets/onMapAssets-radioStationOnMapAsset.webp",
      104,
      4,
      true
    );
    addEntityOnMap(testCardREG);
    addEntityOnMap(testCardBuilding);
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

  const FAKE_PLAYER_INFO: {
    townHallLevel: CardLevel;
    [key: string]: any;
  } = { townHallLevel: 2 };

  return (
    // <>
    //   <div>AAAAAAAAAA</div>
    //   <Button onClick={clearCache}>Clear Cache</Button>
    // </>
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
            playerInfo={FAKE_PLAYER_INFO}
            mapEntities={mapEntities}
          />

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

          {/* PLACEHOLDERS */}
          {/* <EntityTemplateGroup
            setSelectedMapEntity={setSelectedMapEntity}
            imageDetails={placeholders}
            handleHover={handleHover}
            handleLeave={handleLeave}
            highlightedImg={highlightedImg}
          /> */}

          {/* >>> TREES & BUSHES <<< */}
          <TreesOnMap images={images} />
        </>
      </div>
    </>
  );
};

export default TownMap;
