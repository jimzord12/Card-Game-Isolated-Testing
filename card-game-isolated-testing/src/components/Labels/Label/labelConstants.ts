// Styles
const centerize =
  // "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2";
  "absolute flex justify-center items-center";

const sizes = {
  extraSmall: {
    text: "text-[0.75rem]",
  },
  small: {
    text: "text-[1.5rem]",
  },
  medium: {
    text: "text-[2.5rem]",
  },
  large: {
    text: "text-[4rem]",
  },
};

const textStyles = {
  standard: "text-[#000] font-bold",
  contrast: "text-[#fab88e] font-bold",
};

const containerSizes = {
  golden: {
    extraSmall: "w-[90px] h-[34px]",
    small: "w-[180px] h-[67px]",
    medium: "w-[296px] h-[110px]",
    large: "w-[480px] h-[178px]",
  },
  green: {
    extraSmall: "w-[90px] h-[52px]",
    small: "w-[180px] h-[103px]",
    medium: "w-[270px] h-[152px]",
    large: "w-[480px] h-[270px]",
  },
  rusty: {
    extraSmall: "w-[75px] h-[43px]",
    small: "w-[150px] h-[85px]",
    medium: "w-[270px] h-[155px]",
    large: "w-[480px] h-[270px]",
  },
  special: {
    extraSmall: "w-[75px] h-[40px]",
    small: "w-[150px] h-[80px]",
    medium: "w-[270px] h-[140px]",
    large: "w-[480px] h-[270px]",
  },
  // For Simple check here: ./SimpleLabel/simpleLabelConstants.ts
};

const descSizes = {
  extraSmall: "text-[0.75rem]",
  small: "text-[1.5rem]",
  medium: "text-[2rem]",
  large: "text-[2.75rem]",
};

export const styles = {
  centerize,
  sizes,
  textStyles,
  containerSizes,
  descSizes,
};
