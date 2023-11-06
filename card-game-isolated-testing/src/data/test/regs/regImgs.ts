import { SubType, ImageDetail } from "../../../types";

export const testingREGImgs = (
  imageSrc: string,
  subType: SubType
): ImageDetail[] => [
  {
    id: 201,
    src: imageSrc,
    alt: "REG - Amusement Park",
    isHovered: false,
    spot: 1,
    type: "reg",
    subType,
  },
  {
    id: 202,
    src: imageSrc,
    alt: "REG - Hospital",
    isHovered: false,
    spot: 2,
    type: "reg",
    subType,
  },
  {
    id: 203,
    src: imageSrc,
    alt: "REG - Radio Station",
    isHovered: false,
    spot: 3,
    type: "reg",
    subType,
  },
  {
    id: 204,
    src: imageSrc,
    alt: "REG - Tool Store",
    isHovered: false,
    spot: 4,
    type: "reg",
    subType,
  },
  {
    id: 205,
    src: imageSrc,
    alt: "REG - Tool Store",
    isHovered: false,
    spot: 5,
    type: "reg",
    subType,
  },
  {
    id: 206,
    src: imageSrc,
    alt: "REG - Tool Store",
    isHovered: false,
    spot: 6,
    type: "reg",
    subType,
  },
  // ... other images
];
