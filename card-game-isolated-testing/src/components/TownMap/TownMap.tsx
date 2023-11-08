import { useCallback, useEffect, useState } from "react";

// CSS Modules
import styles from "./css/general.module.css";

// Components

import { ImageContextAPI } from "../../context/ImageContext/ImageContextV4";
// import { testingPlaceholderImgs } from "../../data/test/placeholderImgs";
import GlowOutlineFilter from "../GlowOutlineFilter";

const TownMap = () => {
  const { images /* clearCache */ } = ImageContextAPI();
  const [highlightedImg, setHighlightedImg] = useState<number | null>(null);
  const [selectedMapEntity, setSelectedMapEntity] = useState<number | null>(
    null
  );

  // const placeholderTestImages = useMemo(() => testingPlaceholderImgs(), []);

  // const newBuildingCard = BuildingCard.createNew(
  //   123,
  //   22,
  //   "takis200",
  //   "/src/assets/imgs_new_convention/cards/cards-amusementPark.webp",
  //   101,
  //   2
  // );

  // const newRegCard = RegCard.createNew(
  //   123,
  //   22,
  //   "takis200",
  //   "/src/assets/imgs_new_convention/cards/cards-amusementPark.webp",
  //   201,
  //   3
  // );

  // const _generaTesting = {
  //   building: newBuildingCard,
  //   reg: newRegCard,
  // };
  // window.generaTesting = _generaTesting;
  // console.log("💖😬✔❌: ", window.generaTesting);

  // console.log("THE FIRST CARD!!! : ", newBuildingCard);

  if (images?.maps === undefined || images?.onMapAssets === undefined)
    throw new Error("⛔ TownMap: images are undefined!");
  // throw new Error("ssss");

  // useMemo(() => {
  //   console.log("👉 THE IMAGES: ", images);
  //   console.log("👉 IMAGES -> Cards: ", images.cards);
  //   console.log("👉 IMAGES -> Cards -> Hospital: ", images.cards.hospital);
  // }, [images]);

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
          src={images.maps.townMap}
          alt="Background - TownMap"
          className={styles.backgroundImage}
        />

        <>
          <GlowOutlineFilter />
          {/* >>> PLACEHOLDERS <<< */}
          {/* <Placeholders
            images={placeholderTestImages}
            setSelectedMapEntity={setSelectedMapEntity}
            handleHover={handleHover}
            handleLeave={handleLeave}
            highlightedImg={highlightedImg}
          /> */}

          {/* >>> BUILDINGS <<< */}
          {/* <EntityTemplateGroup
            setSelectedMapEntity={setSelectedMapEntity}
            cards={newBuildingCard}
            handleHover={handleHover}
            handleLeave={handleLeave}
            highlightedImg={highlightedImg}
          /> */}

          {/* >>> REGS <<< */}
          {/* <EntityTemplateGroup
            setSelectedMapEntity={setSelectedMapEntity}
            cards={REGImages}
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
