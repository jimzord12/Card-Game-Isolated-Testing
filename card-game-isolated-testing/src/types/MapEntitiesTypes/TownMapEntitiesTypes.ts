import { BuildingSpot, RegSpot } from "..";
import BuildingCard from "../../classes/buildingClass_V2";
import RegCard from "../../classes/regClass_V2";

// export type TownMapEntitiesData = {
//   0: BuildingCard | null;
//   1: RegCard | null;
//   2: BuildingCard | null;
//   3: RegCard | null;
//   4: BuildingCard | null;
//   5: BuildingCard | null;
//   6: BuildingCard | null;
//   7: BuildingCard | null;
//   8: RegCard | null;
//   9: BuildingCard | null;
//   10: RegCard | null;
//   11: RegCard | null;
//   12: BuildingCard | null;
// };

export type BuildingMapEntitiesData = {
  [K in BuildingSpot]?: BuildingCard | null;
};

export type RegMapEntitiesData = {
  [K in RegSpot]?: RegCard | null;
};

export type TownMapEntitiesData = BuildingMapEntitiesData & RegMapEntitiesData;
