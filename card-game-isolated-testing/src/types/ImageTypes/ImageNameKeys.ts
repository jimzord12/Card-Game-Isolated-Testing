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
