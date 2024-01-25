export type ActionsSectionType =
  | "building-passive"
  | "toolStore"
  | "hospital"
  | "reg"
  | "townhall"
  | "factory";

export type ActionsSectionAction = {
  label: string;
  // handler: ((any: any) => void) | (() => void);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handler: ((any: any) => void) | (() => void);
  isDisabled?: boolean;
};
