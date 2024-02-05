import { ToolStoreType } from "..";
import BuildingCard from "../../classes/buildingClass_V2";
import { nameToTemplateDataBuilding } from "../../constants/templates";

export function isToolStore(card: BuildingCard): card is ToolStoreType {
  return (
    card.stats !== undefined &&
    card.templateId === nameToTemplateDataBuilding.ToolStore.id
  );
}
