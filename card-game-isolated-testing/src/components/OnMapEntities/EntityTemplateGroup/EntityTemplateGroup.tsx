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
/**
 * @futureImprovement_1 Create 3 EntityTemplateGroups, one for each type of Entity (Building, Reg, Default). This will make the code more readable and easier to follow.
 */
const EntityTemplateGroup = ({
  highlightedImg,
  handleHover,
  handleLeave,
  setSelectedMapEntity,
  mapEntities,
  entityType,
}: Props) => {
  const props = {
    highlightedImg,
    handleHover,
    handleLeave,
    setSelectedMapEntity,
  };

  return (
    <div>
      {
        <>
          {entityType === "building" && (
            <BuildingsOnMap {...props} mapEntities={mapEntities} />
          )}

          {entityType === "reg" && (
            <RegsOnMap {...props} mapEntities={mapEntities} />
          )}
          {entityType === "default" && <DefaultBuildingsOnMap {...props} />}
        </>
      }
    </div>
  );
};

export default EntityTemplateGroup;
