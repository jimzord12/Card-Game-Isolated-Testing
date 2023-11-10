import { ImageGroups } from "../../types";
import { treesType } from "../../types/MapEntitiesTypes/TreesType";

export const treeImgsProccesor = (images: ImageGroups): treesType[] => [
  {
    spot: 1,
    img: images.onMapAssets.tree_01OnMapAsset,
  },
  {
    spot: 2,
    img: images.onMapAssets.tree_02OnMapAsset,
  },
  {
    spot: 3,
    img: images.onMapAssets.tree_03OnMapAsset,
  },
  {
    spot: 4,
    img: images.onMapAssets.tree_05OnMapAsset,
  },
  {
    spot: 5,
    img: images.onMapAssets.trees_and_Shadow_01_BigOnMapAsset,
  },
  {
    spot: 6,
    img: images.onMapAssets.orange_Bush_and_Shadow_01OnMapAsset,
  },
  {
    spot: 7,
    img: images.onMapAssets.trees_and_Shadow_01_SmallOnMapAsset,
  },
  {
    spot: 8,
    img: images.onMapAssets.forest_01OnMapAsset,
  },
  {
    spot: 9,
    img: images.onMapAssets.REG__01OnMapAsset,
  },
];
