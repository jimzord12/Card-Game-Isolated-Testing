import { useState } from "react";

import styles from "./styles.module.css";

import { buildingCards } from "../../assets/imgs/cards";
import GlowImage from "../GlowImage/GlowImage";

interface propsTypes {
  mapImagePath: string;
}

interface ImageDetail {
  id: number;
  src: string;
  alt: string;
  isHovered: boolean;
}

const initialImages: ImageDetail[] = [
  {
    id: 1,
    src: buildingCards.amusementPark,
    alt: "Building - Amusement Park",
    isHovered: false,
  },
  {
    id: 2,
    src: buildingCards.hospital,
    alt: "Building - Hospital",
    isHovered: false,
  },
  // ... other images
];

const TownMap = ({ mapImagePath }: propsTypes) => {
  const [images, setImages] = useState(initialImages);

  const handleHover = (id: number) => {
    setImages(
      images.map((img) => (img.id === id ? { ...img, isHovered: true } : img))
    );
  };

  const handleLeave = (id: number) => {
    setImages(
      images.map((img) => (img.id === id ? { ...img, isHovered: false } : img))
    );
  };

  return (
    <>
      <div className={styles.imageContainer}>
        <img
          src={mapImagePath}
          alt="Background - TownMap"
          className={styles.backgroundImage}
        />
        <div className={styles.mapEntity1}>
          <GlowImage
            key={images[0].id}
            src={images[0].src}
            alt={images[0].alt}
            isHovered={images[0].isHovered}
            onHover={() => handleHover(images[0].id)}
            onLeave={() => handleLeave(images[0].id)}
          />
        </div>
        <div className={styles.mapEntity2}>
          <GlowImage
            key={images[1].id}
            src={images[1].src}
            alt={images[1].alt}
            isHovered={images[1].isHovered}
            onHover={() => handleHover(images[1].id)}
            onLeave={() => handleLeave(images[1].id)}
          />
        </div>
        <div className={styles.mapEntity3}></div>
        <div className={styles.mapEntity4}></div>
        <div className={styles.mapEntity5}></div>
        <div className={styles.mapEntity6}></div>
        <div className={styles.mapEntity7}></div>
        {/* <GlowOutlineFilter />
        {images.map((img) => (
          <GlowImage
            key={img.id}
            src={img.src}
            alt={img.alt}
            isHovered={img.isHovered}
            onHover={() => handleHover(img.id)}
            onLeave={() => handleLeave(img.id)}
          />
        ))} */}

        {/* <div
          style={{
            position: "absolute",
            top: "18%",
            left: "47%",
            transform: "scale(0.6)",
          }}
        >
          <GlowOutlineFilter />
          {images.map((img) => (
            <GlowImage
              key={img.id}
              src={img.src}
              alt={img.alt}
              isHovered={img.isHovered}
              onHover={() => handleHover(img.id)}
              onLeave={() => handleLeave(img.id)}
            />
          ))}
        </div> */}
      </div>
    </>
  );
};

export default TownMap;
