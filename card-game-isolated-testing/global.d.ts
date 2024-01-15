declare global {
  // type EntityType = "building" | "reg" | "default" | "placeholder" | "padlock";
  // type SubType = "wind" | "solar" | "hall" | "diesel" | "reg" | "building";
  // type Level = 1 | 2 | 3 | 4 | 5;
  // type MapEntity = {
  //   creationTime: string;
  //   creator: string;
  //   desc: string;
  //   disabled: boolean;
  //   forSale: boolean;
  //   id: number;
  //   image: string; // This is the src path
  //   img: string; // This is the ImageName. Ex. "WindTurbine"
  //   name: string;
  //   ownerId: string;
  //   priceTag: null | number;
  //   rarity: null | number;
  //   state: boolean;
  //   stats: any;
  //   templateId: number;
  //   type: EntityType;
  //   level: Level;
  //   requirements?: {
  //     concrete?: number;
  //     crystals?: number;
  //     gold?: number;
  //     metals?: number;
  //     citizens?: number;
  //     diesel?: number;
  //   };
  //   maintenance?: {
  //     gold?: number;
  //     energy?: number;
  //   };
  //   output?: {
  //     [key: string]: number;
  //   };
  // };
  // interface PlaceholderImageDetail {
  //   id: number;
  //   spot: number;
  //   type: EntityType;
  //   subType: SubType;
  // }
  // interface ImageDetail {
  //   id: number;
  //   src: string;
  //   alt: string;
  //   isHovered: boolean;
  //   spot: number;
  //   type: EntityType;
  //   subType?: SubType;
  // }
  // interface TreeImageDetail {
  //   img: string;
  //   spot: number;
  // }
  // interface ImageMap {
  //   [key: string]: string;
  // }
  // type ImageGroupKeys =
  //   | "cards"
  //   | "emblems"
  //   | "frames"
  //   | "gameIcons"
  //   | "labels"
  //   | "maps"
  //   | "menus"
  //   | "modal_backgrounds"
  //   | "quarries"
  //   | "townExpansion"
  //   | "workers"
  //   | "onMapAssets";
  // type ImageGroups = {
  //   [key in ImageGroupKeys]?: ImageMap;
  // };
  // type clearCacheType = () => void;
  // type ImageContextTypes = {
  //   images?: ImageGroups;
  //   clearCache?: clearCacheType;
  // };
  // Utility Types
  // type OneToFive = 1 | 2 | 3 | 4 | 5;
  ///////////////////////////////////////////////////////////////////////////////////
  // 👉 Card Related
  // type CardSpot = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
  // type CardType = "building" | "reg" | "sp";
  // type CardLevel = OneToFive;
  // type CardRarity = OneToFive;
  // type MySQLBoolean = boolean | 0 | 1;
  // type CardRequirements = {
  //   gold: number;
  //   concrete: number;
  //   crystals: number;
  //   metals: number;
  //   dieselBarrels: number;
  //   citizens: number;
  // };
  // interface CardData {
  //   id: number;
  //   templateId: number;
  //   spot: CardSpot;
  //   level: CardLevel;
  //   ownerId: number;
  //   in_mp: MySQLBoolean;
  //   state: MySQLBoolean;
  //   priceTag: number | null;
  //   rarity: CardRarity;
  //   creationTime: string;
  //   creator: string;
  //   endDate?: string;
  //   usedFrom?: any; // Replace 'any' with a more specific type if possible
  //   stats?: any; // Replace 'any' with a more specific type if possible
  // }
  //////////////////////////////////////////////////////////////////////////////
  // 👉 Buildings
  // type BuildingSpot = 0 | 2 | 4 | 5 | 6 | 7 | 9 | 12;
  // type BuildingMaintenance = { energy: number };
  // type BuildingOutput = { boost: number };
  // type BuildingTemplateId = 101 | 102 | 103 | 104;
  // type BuildingName =
  //   | "ToolStore"
  //   | "AmusementPark"
  //   | "Hopsital"
  //   | "RadioStation";
  // interface BuildingCardData extends Omit<CardData, "spot" | "templateId"> {
  //   spot: BuildingSpot;
  //   templateId: BuildingTemplateId;
  // }
  // type BuildingStats = {
  //   // This is only for the ToolStore Building Card
  //   gold: number;
  //   concrete: number;
  //   crystals: number;
  //   metals: number;
  // };
  // interface TemplateDataBuilding {
  //   id: BuildingTemplateId;
  //   type: "building";
  //   name: BuildingName;
  //   baseOutput: BuildingOutput;
  //   baseMaintenance: BuildingMaintenance;
  //   baseRequirements: CardRequirements;
  //   baseStats?: BuildingStats;
  //   desc: string;
  // }
  //////////////////////////////////////////////////////////////////////////////
  // 👉 REGs
  // type RegSpot = 0 | 1 | 3 | 8 | 10 | 11 | 13;
  // type RegTemplateId = 201 | 202 | 203 | 204;
  // type RegMaintenance = { gold: number };
  // type RegOutput = { energy: number };
  // type RegName =
  //   | "SimpleWindTurbine"
  //   | "SuperWindTurbine"
  //   | "SimpleSolarPanel"
  //   | "SuperSolarPanel";
  // interface RegCardData extends Omit<CardData, "spot" | "templateId"> {
  //   spot: RegSpot;
  //   templateId: RegTemplateId;
  // }
  // interface TemplateDataReg {
  //   id: RegTemplateId;
  //   type: "reg";
  //   name: RegName;
  //   baseOutput: RegOutput;
  //   baseMaintenance: RegMaintenance;
  //   baseRequirements: CardRequirements;
  //   desc: string;
  // }
  //////////////////////////////////////////////////////////////////////////////
  // 👉 SP
  // type SPOutput = { boost: number };
  // type SPTemplateId = 301 | 302 | 303;
  // type SPName = "WallStreet" | "LoveApp" | "SuperStrong";
  // interface SPCardData extends Omit<CardData, "spot" | "templateId" | "level"> {
  //   templateId: SPTemplateId;
  // }
  // interface TemplateDataSP {
  //   id: SPTemplateId;
  //   type: "sp";
  //   name: SPName;
  //   baseOutput: SPOutput;
  //   baseRequirements: CardRequirements;
  //   desc: string;
  // }
  //////////////////////////////////////////////////////////////////////////////
  // 👉  Default Buildings
  // type DefaultBuildingName = "TownHall" | "DieselFactory";
  // type DefaultBuildingLevel = OneToFive;
  // interface DefaultBuildings {
  //   name: DefaultBuildingName;
  //   level: DefaultBuildingLevel;
  // }
}

// export {}; // This turns the file into a module
