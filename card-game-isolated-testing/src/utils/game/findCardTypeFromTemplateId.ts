import { spTemplateIds } from "../../constants/templates/spsTemplates";
import { buildingTemplateIds } from "../../constants/templates/buildingsTemplates";
import { regTemplateIds } from "../../constants/templates/regsTemplates";
import { CardType } from "../../types";

export const findCardTypeFromTemplateId = (templateId: number): CardType => {
  if (spTemplateIds.includes(templateId)) return "sp";
  if (buildingTemplateIds.includes(templateId)) return "building";
  if (regTemplateIds.includes(templateId)) return "reg";
  throw new Error(
    "⛔ Utils/game: findCardTypeFromTemplateId: Invalid templateId"
  );
};
