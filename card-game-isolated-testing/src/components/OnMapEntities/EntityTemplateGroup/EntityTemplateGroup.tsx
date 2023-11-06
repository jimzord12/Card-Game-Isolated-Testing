import { Dispatch, SetStateAction } from "react";
// Wrap those Raw images with this
import GlowImage from "../../GlowImage/GlowImage";

// Import all CSS Styles Required
import "./css/buildings.css";
import "./css/defaultBuildings.css";
import "./css/regs/solar.css";
import "./css/regs/wind.css";
import { ImageDetail, EntityType, SubType } from "../../../types";

interface propsTypes {
  highlightedImg: number | null;
  handleHover: (id: number) => void;
  handleLeave: (id: number) => void;
  //TODO: Entity's Type goes here
  setSelectedMapEntity: Dispatch<SetStateAction<number | null>>;
  imageDetails: ImageDetail[];
}

const cssClassSelector = (
  type: EntityType,
  spot?: number,
  subType?: SubType
): string | undefined => {
  switch (type) {
    case "building":
      return `buildingSpot${spot}`;

    case "reg":
      if (subType === "solar") return `regSpotSolar${spot}`;
      if (subType === "wind") return `regSpotWind${spot}`;
      break;

    case "default":
      if (subType === "hall") return "defaultBuildingTownHall";
      if (subType === "diesel") return "defaultBuildingFactory";
      break;

    default:
      throw new Error(
        "⛔ Problem Origin: #1 EntityTemplate (Component), #2 cssClassSelector (Function inside Component"
      );
  }
};

const EntityTemplateGroup = ({
  imageDetails,
  highlightedImg,
  handleHover,
  handleLeave,
  setSelectedMapEntity,
}: propsTypes) => {
  return (
    <div>
      {imageDetails.map((img) => (
        <div
          key={img.id}
          className={cssClassSelector(img.type, img.spot, img.subType)}
          onClick={() => setSelectedMapEntity(img.id)}
        >
          {img.type === "placeholder" && <img src="asdsa" alt="padlock" />}
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

export default EntityTemplateGroup;
