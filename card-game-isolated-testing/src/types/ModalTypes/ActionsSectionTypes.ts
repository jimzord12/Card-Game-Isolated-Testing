export type ActionsSectionType =
  | "building-passive"
  | "building-active"
  | "reg"
  | "townhall"
  | "factory";

export type ActionsSectionAction = {
  text: string;
  handler: () => void;
};
