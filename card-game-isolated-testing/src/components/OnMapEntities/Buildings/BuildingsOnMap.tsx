import { buildings } from "../../../assets/imgs/onMapAssets";
import GlowImage from "../../GlowImage/GlowImage";
import "./buildings.css";

interface ImageDetail {
  id: number;
  src: string;
  alt: string;
  isHovered: boolean;
  spot: number;
}

interface propsTypes {
  highlightedImg: number | null;
  handleHover: (id: number) => void;
  handleLeave: (id: number) => void;
}

const testingAsset = buildings.hospital;

const initialImages: ImageDetail[] = [
  {
    id: 1,
    src: testingAsset,
    alt: "Building - Amusement Park",
    isHovered: false,
    spot: 1,
  },
  {
    id: 2,
    src: testingAsset,
    alt: "Building - Hospital",
    isHovered: false,
    spot: 2,
  },
  {
    id: 3,
    src: testingAsset,
    alt: "Building - Radio Station",
    isHovered: false,
    spot: 3,
  },
  {
    id: 4,
    src: testingAsset,
    alt: "Building - Tool Store",
    isHovered: false,
    spot: 4,
  },
  {
    id: 5,
    src: testingAsset,
    alt: "Building - Tool Store",
    isHovered: false,
    spot: 5,
  },
  {
    id: 6,
    src: testingAsset,
    alt: "Building - Tool Store",
    isHovered: false,
    spot: 6,
  },
  {
    id: 7,
    src: testingAsset,
    alt: "Building - Tool Store",
    isHovered: false,
    spot: 7,
  },
  // ... other images
];

const images = initialImages;

const BuildingsOnMap = ({
  highlightedImg,
  handleHover,
  handleLeave,
}: propsTypes) => {
  return (
    <div>
      {images.map((img) => (
        <div className={`buildingSpot${img.spot}`}>
          <GlowImage
            key={img.id}
            src={img.src}
            alt={img.alt}
            isHovered={highlightedImg === img.id}
            onHover={() => handleHover(img.id)}
            onLeave={() => handleLeave(img.id)}
          />
        </div>
      ))}
      {/* 
      <div className={buildingStyles.buildingSpot1}>
        <GlowImage
          key={images[0].id}
          src={images[0].src}
          alt={images[0].alt}
          // isHovered={images[0].isHovered}
          isHovered={highlightedImg === images[0].id}
          onHover={() => handleHover(images[0].id)}
          onLeave={() => handleLeave(images[0].id)}
        />
      </div>
      */}
    </div>
  );
};

export default BuildingsOnMap;
