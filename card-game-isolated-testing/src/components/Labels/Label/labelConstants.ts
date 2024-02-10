// Styles
const centerize =
  "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2";
// "flex justify-center items-center";

const sizes = {
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
    small: "w-[180px] h-[67px]",
    medium: "w-[296px] h-[110px]",
    large: "w-[480px] h-[178px]",
  },
  green: {
    small: "w-[180px] h-[103px]",
    medium: "w-[270px] h-[152px]",
    large: "w-[480px] h-[270px]",
  },
  rusty: {
    small: "w-[150px] h-[85px]",
    medium: "w-[270px] h-[155px]",
    large: "w-[480px] h-[270px]",
  },
  special: {
    small: "w-[150px] h-[80px]",
    medium: "w-[270px] h-[140px]",
    large: "w-[480px] h-[270px]",
  },
  // For Simple check here: ./SimpleLabel/simpleLabelConstants.ts
};

const descSizes = {
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
