export type GameResources =
  | "concrete"
  | "metals"
  | "crystals"
  | "diesel"
  | "gold";
export type ToolStoreResources = Exclude<GameResources, "gold">;
