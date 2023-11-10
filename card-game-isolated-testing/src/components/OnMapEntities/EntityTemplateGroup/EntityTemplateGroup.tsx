import { Dispatch, SetStateAction } from "react";
// Wrap those Raw images with this

// Import all CSS Styles Required
import { EntityType, TownMapEntitiesData } from "../../../types";
import BuildingsOnMap from "../Buildings/BuildingsOnMap";
import DefaultBuildingsOnMap from "../DefaultBuildings/DefaultBuildingsOnMap";
import RegsOnMap from "../REGs/REGsOnMap";

interface Props {
  highlightedImg: number | null;
  handleHover: (id: number) => void;
  handleLeave: (id: number) => void;
  setSelectedMapEntity: Dispatch<SetStateAction<number | null>>;
  mapEntities: TownMapEntitiesData;
  entityType: EntityType;
}

const EntityTemplateGroup = ({
  highlightedImg,
  handleHover,
  handleLeave,
  setSelectedMapEntity,
  mapEntities,
  entityType,
}: Props) => {
  return (
    <div>
      {
        <>
          {entityType === "building" && (
            <BuildingsOnMap
              highlightedImg={highlightedImg}
              handleHover={handleHover}
              handleLeave={handleLeave}
              setSelectedMapEntity={setSelectedMapEntity}
              mapEntities={mapEntities}
            />
          )}

          {entityType === "reg" && (
            <RegsOnMap
              highlightedImg={highlightedImg}
              handleHover={handleHover}
              handleLeave={handleLeave}
              setSelectedMapEntity={setSelectedMapEntity}
              mapEntities={mapEntities}
            />
          )}
          {entityType === "default" && (
            <DefaultBuildingsOnMap
              highlightedImg={highlightedImg}
              handleHover={handleHover}
              handleLeave={handleLeave}
              setSelectedMapEntity={setSelectedMapEntity}
            />
          )}
        </>
      }
    </div>
  );
};

export default EntityTemplateGroup;
