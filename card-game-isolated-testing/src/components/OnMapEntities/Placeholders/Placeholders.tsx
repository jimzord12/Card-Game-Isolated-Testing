import { Dispatch, SetStateAction } from "react";
import PlaceholderBuilding from "./Buildings/B_placeholder";
import PlaceholderREG from "./REGs/R_placeholder";

import "./placeholders.css";
import { PlaceholderImageDetail } from "../../../types";

interface props {
  images: PlaceholderImageDetail[];
  highlightedImg: number | null;
  handleHover: (id: number) => void;
  handleLeave: (id: number) => void;
  //TODO: Entity's Type goes here
  setSelectedMapEntity: Dispatch<SetStateAction<number | null>>;
  //   imageDetails: ImageDetail[];
}

const Placeholders = ({
  images,
  highlightedImg,
  handleHover,
  handleLeave,
  setSelectedMapEntity,
}: props) => {
  return (
    <div>
      {images.map((img) => {
        if (img.type !== "placeholder") return;
        if (img.subType === "building") {
          return (
            <div className={`placeholderSpot${img.spot}`} key={img.id}>
              <PlaceholderBuilding
                id={img.id}
                spot={img.spot}
                highlightedImg={highlightedImg}
                handleHover={handleHover}
                handleLeave={handleLeave}
                setSelectedMapEntity={setSelectedMapEntity}
              />
            </div>
          );
        } else if (img.subType === "reg") {
          return (
            <div className={`placeholderSpot${img.spot}`} key={img.id}>
              <PlaceholderREG
                id={img.id}
                spot={img.spot}
                highlightedImg={highlightedImg}
                handleHover={handleHover}
                handleLeave={handleLeave}
                setSelectedMapEntity={setSelectedMapEntity}
              />
            </div>
          );
        } else {
          throw new Error("⛔ Problem Origin: Placeholders.tsx");
        }
      })}
    </div>
  );
};

export default Placeholders;
