import { useCallback, useEffect, useState } from "react";

// CSS Modules
import styles from "./css/general.module.css";

// Components

import ImageContextAPI from "../../context/ImageContext/ImageContext";
import { testingBuildingImgs } from "../../data/test/buildingImgs";
import GlowOutlineFilter from "../GlowOutlineFilter";
import EntityTemplateGroup from "../OnMapEntities/EntityTemplateGroup/EntityTemplateGroup";

const TownMap = () => {
  const { images, clearCache } = ImageContextAPI();
  const [highlightedImg, setHighlightedImg] = useState<number | null>(null);
  const [selectedMapEntity, setSelectedMapEntity] = useState<number | null>(
    null
  );

  if (images?.maps === undefined || images?.onMapAssets === undefined)
    throw new Error("⛔ TownMap: images are undefined!");

  const assetsOrganizer = (type: EntityType, subType?: SubType) => {
    const temp = images?.onMapAssets;
    const buildingImgs = {
      amusementPark: temp!.amusementPark,
      hospital: temp!.hospital,
      toolStore: temp!.toolStore,
      radioStation: temp!.radioStation,
    };
    switch (type) {
      case "building":
        return testingBuildingImgs(buildingImgs.amusementPark);
        break;
      // case "reg":
      //   break;
      // case "default":
      //   break;
      // case "placeholder":
      //   break;
      // case "padlock":
      //   break;

      default:
        break;
    }
  };

  console.log("👉 THE IMAGES: ", images);

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

  return (
    // <>
    //   <div>AAAAAAAAAA</div>
    //   <Button onClick={clearCache}>Clear Cache</Button>
    // </>
    <>
      <div className={styles.imageContainer}>
        <img
          src={images.maps.townMap || "aaa"}
          alt="Background - TownMap"
          className={styles.backgroundImage}
        />

        <>
          <GlowOutlineFilter />
          {/* >>> PLACEHOLDERS <<< */}
          {/* <Placeholders
            images={placeholders}
            setSelectedMapEntity={setSelectedMapEntity}
            handleHover={handleHover}
            handleLeave={handleLeave}
            highlightedImg={highlightedImg}
          /> */}

          {/* >>> BUILDINGS <<< */}
          <EntityTemplateGroup
            setSelectedMapEntity={setSelectedMapEntity}
            imageDetails={assetsOrganizer("building")}
            handleHover={handleHover}
            handleLeave={handleLeave}
            highlightedImg={highlightedImg}
          />

          {/* >>> REGS <<< */}
          {/* <EntityTemplateGroup
            setSelectedMapEntity={setSelectedMapEntity}
            imageDetails={REGImages}
            handleHover={handleHover}
            handleLeave={handleLeave}
            highlightedImg={highlightedImg}
          /> */}

          {/* >>> DEFAULT BUILDINGS <<< */}
          {/* <EntityTemplateGroup
            setSelectedMapEntity={setSelectedMapEntity}
            imageDetails={defaultBuildings}
            handleHover={handleHover}
            handleLeave={handleLeave}
            highlightedImg={highlightedImg}
          /> */}

          {/* PLACEHOLDERS */}
          {/* <EntityTemplateGroup
            setSelectedMapEntity={setSelectedMapEntity}
            imageDetails={placeholders}
            handleHover={handleHover}
            handleLeave={handleLeave}
            highlightedImg={highlightedImg}
          /> */}

          {/* >>> TREES & BUSHES <<< */}
          {/* <TreesOnMap /> */}
        </>
      </div>
    </>
  );
};

export default TownMap;
