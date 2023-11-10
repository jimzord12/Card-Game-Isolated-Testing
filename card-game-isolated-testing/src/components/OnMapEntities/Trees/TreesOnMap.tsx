// interface propsTypes {}
// import { treeImgs } from "../../../data/imageData";
// import { multipleTree } from "../../../assets/imgs_new_convention/onMapAssets";
import { useMemo } from "react";
import { ImageGroups } from "../../../types";
import { treeImgsProccesor } from "../../../utils/images/treeImgsProccesor";
import Tree from "./Tree";
import { treesType } from "../../../types/MapEntitiesTypes/TreesType";

interface Props {
  images: ImageGroups | undefined;
}

const TreesOnMap = ({ images }: Props) => {
  if (images === undefined)
    throw new Error("TreesOnMap: images Object is undefined!");

  const trees: treesType[] = useMemo(() => treeImgsProccesor(images), [images]);
  return (
    <>
      {trees.map(({ spot, img }, index) => (
        <Tree key={index} spot={spot} imgSrc={img} />
      ))}
    </>
  );
};

export default TreesOnMap;
