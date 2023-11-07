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
  amusementPark: string;
  energyDrink: string;
  heartPhone: string;
  hospital: string;
  radioStation: string;
  simpleSolarPanel: string;
  simpleWindTurbine: string;
  superWindTurbine: string;
  superSolarPanel: string;
  stocksChart: string;
  toolStore: string;
};

type EmblemImageGroup = {
  concrete: string;
  crystals: string;
  islandStats: string;
  metals: string;
  oilRig: string;
  townExpansion: string;
};

type FrameImageGroup = {
  bamboo: string;
  greenLeaves: string;
  metal: string;
  rusty: string;
  stefani: string;
};

type GameIconsImageGroup = {
  activateGradient: string;
  angryFace: string;
  battery: string;
  blueLevelUpArrow: string;
  buildingsSpace: string;
  calendar: string;
  citizenCircular: string;
  citizensSpace: string;
  concrete: string;
  craftButton: string;
  crystals: string;
  dieselBarrel: string;
  energyProduction: string;
  energyUtilization: string;
  expenses: string;
  gold: string;
  greenWavyArrow: string;
  growth: string;
  happyFace: string;
  id: string;
  income: string;
  levelUpGradient: string;
  metals: string;
  neutralFace: string;
  overjoyedFace: string;
  rank: string;
  regSpace: string;
  sadFace: string;
  sellGradient: string;
  sideBarArrow: string;
  sliderBar: string;
  sliderDot: string;
  totalGold: string;
  user: string;
  woodenCloseModal: string;
};

type LabelsImageGroup = {
  colorful: string;
  goldenSpecial: string;
  goldenStandard: string;
  greenEnergy: string;
  level: string;
  rusty: string;
  woodenGround: string;
  woodenLong: string;
  woodenNormal: string;
  woodenShort: string;
};

type MapsImageGroup = {
  townMap: string;
};

type MenusImageGroup = {
  buildings: string;
  regs: string;
  sps: string;
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
  REGPadlock: string;
  REGPlaceholder: string;
  REG__01: string;
  amusementPark: string;
  buildingPadLock: string;
  buildingPlaceholder: string;
  dieselFactory: string;
  forest_01: string;
  hospital: string;
  orange_Bush_and_Shadow_01: string;
  radioStation: string;
  simpleSolarPanel: string;
  simpleWindTurbine: string;
  superSolarPanel: string;
  superWindTurbine: string;
  toolStore: string;
  townHall: string;
  tree_01: string;
  tree_02: string;
  tree_03: string;
  tree_05: string;
  trees_and_Shadow_01_Big: string;
  trees_and_Shadow_01_Small: string;
};

type QuarriesImageGroup = {
  concreteIcon: string;
  crystalsIcon: string;
  metalsIcon: string;
  oilRigIcon: string;
};

type TownExpansionImageGroup = {
  Emblem: string;
  Icon: string;
};

type WorkersImageGroup = {
  concrete: string;
  crystals: string;
  doctor: string;
  metals: string;
  oilRig: string;
  simpleCitizen: string;
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
  | "onMapAssets";

export type clearCacheType = () => void;

export type ImageContextTypes = {
  images?: ImageGroups;
  clearCache?: clearCacheType;
  areImagesReady?: boolean;
  loadingProgress?: number;
};
