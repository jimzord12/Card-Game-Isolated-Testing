import { EntityType, SubType } from ".";

export interface PlaceholderImageDetail {
  id: number;
  spot: number;
  type: EntityType;
  subType: SubType;
}

export interface ImageDetail {
  id: number;
  src: string;
  alt: string;
  isHovered: boolean;
  spot: number;
  type: EntityType;
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
  | "onMapAssets";

export type ImageGroups = {
  [key in ImageGroupKeys]?: ImageMap;
};

export type clearCacheType = () => void;

export type ImageContextTypes = {
  images?: ImageGroups;
  clearCache?: clearCacheType;
};
