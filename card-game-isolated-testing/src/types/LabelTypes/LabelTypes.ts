export type labelType = "golden" | "green" | "rusty" | "special" | "simple";
export type LabelSize = "extraSmall" | "small" | "medium" | "large";

export type labelImages = {
  // [key in labelType]: string;
  golden: {
    standard: string;
    special: string;
  };
  otherLabels: {
    greenEnergy: string;
    rusty: string;
  };
};
