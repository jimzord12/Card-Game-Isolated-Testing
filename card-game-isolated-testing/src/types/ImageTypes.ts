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

type CardImageGroup = {
  amusementParkCard: string;
  energyDrinkCard: string;
  heartPhoneCard: string;
  hospitalCard: string;
  radioStationCard: string;
  simpleSolarPanelCard: string;
  simpleWindTurbineCard: string;
  superWindTurbineCard: string;
  superSolarPanelCard: string;
  stocksChartCard: string;
  toolStoreCard: string;
};

type EmblemImageGroup = {
  concreteEmblem: string;
  crystalsEmblem: string;
  islandStatsEmblem: string;
  metalsEmblem: string;
  oilRigEmblem: string;
};

type FrameImageGroup = {
  bambooFrame: string;
  greenLeavesFrame: string;
  metalFrame: string;
  rustyFrame: string;
  stefaniFrame: string;
};

type GameIconsImageGroup = {
  activateGradientGameIcon: string;
  angryFaceGameIcon: string;
  batteryGameIcon: string;
  blueLevelUpArrowGameIcon: string;
  buildingsSpaceGameIcon: string;
  calendarGameIcon: string;
  citizenCircularGameIcon: string;
  citizensSpaceGameIcon: string;
  concreteGameIcon: string;
  concreteCircularGameIcon: string;
  craftButtonGameIcon: string;
  crystalsGameIcon: string;
  crystalsCircularGameIcon: string;
  dieselBarrelGameIcon: string;
  dieselBarrelCircularGameIcon: string;
  energyProductionGameIcon: string;
  energyUtilizationGameIcon: string;
  expensesGameIcon: string;
  goldCircularGameIcon: string;
  goldGameIcon: string;
  greenArrowUpgradeGameIcon: string;
  greenWavyArrowGameIcon: string;
  growthGameIcon: string;
  happyFaceGameIcon: string;
  idGameIcon: string;
  incomeGameIcon: string;
  levelUpGradientGameIcon: string;
  metalsGameIcon: string;
  metalsCircularGameIcon: string;
  neutralFaceGameIcon: string;
  overjoyedFaceGameIcon: string;
  rankGameIcon: string;
  regSpaceGameIcon: string;
  sadFaceGameIcon: string;
  sellGradientGameIcon: string;
  sideBarArrowGameIcon: string;
  sliderBarGameIcon: string;
  sliderDotGameIcon: string;
  totalGoldGameIcon: string;
  userGameIcon: string;
  woodenCloseModalGameIcon: string;
};

type LabelsImageGroup = {
  colorfulLabel: string;
  goldenSpecialLabel: string;
  goldenStandardLabel: string;
  greenEnergyLabel: string;
  levelLabel: string;
  quarryLevelLabel: string;
  rustyLabel: string;
  woodenGroundLabel: string;
  woodenLongLabel: string;
  woodenNormalLabel: string;
  woodenShortLabel: string;
};

type MapsImageGroup = {
  townMap: string;
};

type MenusImageGroup = {
  buildingsMenu: string;
  regsMenu: string;
  spsMenu: string;
};

type ModalBackgroundsImageGroup = {
  amusementParkBG: string;
  dieselFactoryBG: string;
  hospitalBG: string;
  levelUpBuildingBG: string;
  levelUpRegBG: string;
  quarryConcreteBG: string;
  quarryCrystalsBG: string;
  quarryMetalsBG: string;
  quarryOilRigBG: string;
  radioStationBG: string;
  solarPanelBG: string;
  toolStoreBG: string;
  townExpansionBG: string;
  townHallBG: string;
  windTurbineBG: string;
};

type OnMapAssetsImageGroup = {
  REGPadlockOnMapAsset: string;
  REGPlaceholderOnMapAsset: string;
  REG__01OnMapAsset: string;
  amusementParkOnMapAsset: string;
  buildingPadLockOnMapAsset: string;
  buildingPlaceholderOnMapAsset: string;
  dieselFactoryOnMapAsset: string;
  forest_01OnMapAsset: string;
  hospitalOnMapAsset: string;
  orange_Bush_and_Shadow_01OnMapAsset: string;
  radioStationOnMapAsset: string;
  simpleSolarPanelOnMapAsset: string;
  simpleWindTurbineOnMapAsset: string;
  superSolarPanelOnMapAsset: string;
  superWindTurbineOnMapAsset: string;
  toolStoreOnMapAsset: string;
  townHallOnMapAsset: string;
  tree_01OnMapAsset: string;
  tree_02OnMapAsset: string;
  tree_03OnMapAsset: string;
  tree_05OnMapAsset: string;
  trees_and_Shadow_01_BigOnMapAsset: string;
  trees_and_Shadow_01_SmallOnMapAsset: string;
};

type QuarriesImageGroup = {
  concreteIconQuarry: string;
  crystalsIconQuarry: string;
  metalsIconQuarry: string;
  oilRigIconQuarry: string;
};

type TownExpansionImageGroup = {
  townExpansionEmblem: string;
  townExpansionIcon: string;
};

type WorkersImageGroup = {
  concreteWorker: string;
  crystalsWorker: string;
  doctorWorker: string;
  metalsWorker: string;
  oilRigWorker: string;
  simpleCitizenWorker: string;
};

type ErrorImageGroup = {
  catBreakError: string;
};

type AppUtilsImageGroup = {
  rotateDeviceImgAppUtil: string;
};

export type ImageGroups = {
  cards: CardImageGroup;
  emblems: EmblemImageGroup;
  frames: FrameImageGroup;
  gameIcons: GameIconsImageGroup;
  labels: LabelsImageGroup;
  maps: MapsImageGroup;
  menus: MenusImageGroup;
  modal_backgrounds: ModalBackgroundsImageGroup;
  onMapAssets: OnMapAssetsImageGroup;
  quarries: QuarriesImageGroup;
  townExpansion: TownExpansionImageGroup;
  workers: WorkersImageGroup;
  error: ErrorImageGroup;
  appUtils: AppUtilsImageGroup;
};

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

type CardImageNameKey =
  | "amusementParkCard"
  | "energyDrinkCard"
  | "heartPhoneCard"
  | "hospitalCard"
  | "radioStationCard"
  | "simpleSolarPanelCard"
  | "simpleWindTurbineCard"
  | "superWindTurbineCard"
  | "superSolarPanelCard"
  | "stocksChartCard"
  | "toolStoreCard";

type EmblemImageNameKey =
  | "concreteEmblem"
  | "crystalsEmblem"
  | "metalsEmblem"
  | "oilRigEmblem"
  | "islandStatsEmblem";

type FrameImageNameKey =
  | "greenLeavesFrame"
  | "bambooFrame"
  | "rustyFrame"
  | "goldFrame"
  | "metalFrame"
  | "stefaniFrame";

type GameIconImageNameKey =
  | "activateGradientGameIcon"
  | "angryFaceGameIcon"
  | "batteryGameIcon"
  | "blueLevelUpArrowGameIcon"
  | "buildingsSpaceGameIcon"
  | "calendarGameIcon"
  | "citizenCircularGameIcon"
  | "citizensSpaceGameIcon"
  | "concreteCircularGameIcon"
  | "concreteGameIcon"
  | "craftButtonGameIcon"
  | "crystalsCircularGameIcon"
  | "crystalsGameIcon"
  | "dieselBarrelCircularGameIcon"
  | "dieselBarrelGameIcon"
  | "energyProductionGameIcon"
  | "energyUtilizationGameIcon"
  | "expensesGameIcon"
  | "goldCircularGameIcon"
  | "goldGameIcon"
  | "greenArrowUpgradeGameIcon"
  | "greenWavyArrowGameIcon"
  | "growthGameIcon"
  | "happyFaceGameIcon"
  | "idGameIcon"
  | "incomeGameIcon"
  | "levelUpGradientGameIcon"
  | "metalsCircularGameIcon"
  | "metalsGameIcon"
  | "neutralFaceGameIcon"
  | "overjoyedFaceGameIcon"
  | "rankGameIcon"
  | "regSpaceGameIcon"
  | "sadFaceGameIcon"
  | "sellGradientGameIcon"
  | "sideBarArrowGameIcon"
  | "sliderBarGameIcon"
  | "sliderDotGameIcon"
  | "totalGoldGameIcon"
  | "userGameIcon"
  | "woodenCloseModalGameIcon";

type LabelImageNameKey =
  | "colorfulLabel"
  | "goldenSpecialLabel"
  | "goldenStandardLabel"
  | "greenEnergyLabel"
  | "levelLabel"
  | "quarryLevelLabel"
  | "rustyLabel"
  | "woodenGroundLabel"
  | "woodenLongLabel"
  | "woodenNormalLabel"
  | "woodenShortLabel";

type MapImageNameKey = "townMap";
type MenuImageNameKey = "buildingsMenu" | "regsMenu" | "spsMenu";
type BackgroundImageNameKey =
  | "amusementParkBG"
  | "dieselFactoryBG"
  | "hospitalBG"
  | "levelUpBuildingBG"
  | "levelUpRegBG"
  | "quarryConcreteBG"
  | "quarryCrystalsBG"
  | "quarryMetalsBG"
  | "quarryOilRigBG"
  | "radioStationBG"
  | "solarPanelBG"
  | "toolStoreBG"
  | "townExpansionBG"
  | "townHallBG"
  | "windTurbineBG";

type OnMapAssetImageNameKey =
  | "amusementParkOnMapAsset"
  | "buildingPadLockOnMapAsset"
  | "buildingPlaceholderOnMapAsset"
  | "dieselFactoryOnMapAsset"
  | "forest_01OnMapAsset"
  | "hospitalOnMapAsset"
  | "orange_Bush_and_Shadow_01OnMapAsset"
  | "radioStationOnMapAsset"
  | "REG__01OnMapAsset"
  | "REGPadlockOnMapAsset"
  | "REGPlaceholderOnMapAsset"
  | "simpleSolarPanelOnMapAsset"
  | "simpleWindTurbineOnMapAsset"
  | "superSolarPanelOnMapAsset"
  | "superWindTurbineOnMapAsset"
  | "toolStoreOnMapAsset"
  | "townHallOnMapAsset"
  | "tree_01OnMapAsset"
  | "tree_02OnMapAsset"
  | "tree_03OnMapAsset"
  | "tree_05OnMapAsset"
  | "trees_and_Shadow_01_BigOnMapAsset"
  | "trees_and_Shadow_01_SmallOnMapAsset";

type QuarryImageNameKey =
  | "concreteIconQuarry"
  | "crystalsIconQuarry"
  | "metalsIconQuarry"
  | "oilRigIconQuarry";

type TownExpansionImageNameKey = "townExpansionEmblem" | "townExpansionIcon";

type WorkerImageNameKey =
  | "concreteWorker"
  | "crystalsWorker"
  | "doctorWorker"
  | "metalsWorker"
  | "oilRigWorker"
  | "simpleCitizenWorker";

type ErrorImageNameKey = "catBreakError";

type AppUtilImageNameKey = "rotateDeviceImgAppUtil";

export type ImageNameKey =
  | CardImageNameKey
  | EmblemImageNameKey
  | FrameImageNameKey
  | GameIconImageNameKey
  | LabelImageNameKey
  | MapImageNameKey
  | MenuImageNameKey
  | BackgroundImageNameKey
  | OnMapAssetImageNameKey
  | QuarryImageNameKey
  | TownExpansionImageNameKey
  | WorkerImageNameKey
  | ErrorImageNameKey
  | AppUtilImageNameKey;
