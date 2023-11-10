import { BuildingSpot, CardLevel, RegSpot } from "..";
import { SubType } from "../MapEntitiesTypes";
import { ImageGroups } from "./ImageGroupTypes";

export interface PlaceholderImageDetail {
  id: number;
  spot: BuildingSpot | RegSpot;
  // type: EntityType;
  subType: SubType;
  unlocksAt: CardLevel;
}

export interface ImageDetail {
  id: number;
  src: string;
  alt: string;
  isHovered: boolean;
  spot: number;
  // type: EntityType;
  subType?: SubType;
}

export interface TreeImageDetail {
  img: string;
  spot: number;
}

export interface ImageMap {
  [key: string]: string;
}

export type ImageGroupKeys =
  | "cards"
  | "emblems"
  | "frames"
  | "gameIcons"
  | "labels"
  | "maps"
  | "menus"
  | "modal_backgrounds"
  | "quarries"
  | "townExpansion"
  | "workers"
  | "onMapAssets"
  | "error"
  | "appUtils";

export type clearCacheType = () => void;

export interface ImageObject {
  [key: string]: string | ImageObject;
}

export type ImageContextTypes = {
  images?: ImageGroups;
  clearCache?: clearCacheType;
  areImagesReady?: boolean;
  loadingProgress?: number;
};
